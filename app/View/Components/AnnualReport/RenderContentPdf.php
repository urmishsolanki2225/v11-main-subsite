<?php

namespace App\View\Components\AnnualReport;

use Illuminate\View\Component;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

use App\Models\Item;
use App\Actions\OEmbed;
use App\Models\GeodataMap;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Log;
use App\View\Components\Link;


class RenderContentPdf extends Component
{
    private $content;
    public $output;

    private $footnoteUuids;
    private $footnoteAnchors;
    private $footnotes;

    /**
     * Component to render content, either from html or json, prefers json as input
     * Renders to html (default), plain text or amp
     * The $output property contains the output, after creating the object,
     *      so it can be used outside of component structure as well
     * $content param can be ItemContent, CollectionContent or AttachmentGroupContent
     *
     * @return void
     */
    public function __construct(
        $content,
        $mode = "html",
        $textTag = null,
        $wordLimit = null,
        $blurbOnly = false,
        $contentOnly = false
    ) {
        $this->content = $content;
        $this->footnoteUuids = [];
        $this->footnoteAnchors = [];
        $this->footnotes = [];

        if (empty($this->content)) {
            $this->output = "";
            return;
        }
        if ($mode == "pageclass") {
            $contentOnly = true;
        }

        $blurbJson = [];
        $contentJson = [];
        if (!$contentOnly && !empty($this->content->blurb_json)) {
            $blurbJson = json_decode($this->content->blurb_json);
        }
        if (!$blurbOnly) {
            if (!empty($this->content->content_json)) {
                $contentJson = json_decode($this->content->content_json);
            } elseif (gettype($this->content) === "string") {
                $contentJson = json_decode($this->content);
            }
        }
        if ($mode == "pageclass") {
            $this->processPageclass($contentJson);
            return;
        }
        $this->processFootnotes($blurbJson);
        $this->processFootnotes($contentJson);
        if (count($this->footnotes)) {
            $this->reorderFootnotes($contentJson);
        }
        if ($mode == "html") {
            $this->output =
                $this->generateHtml($blurbJson) .
                $this->generateHtml($contentJson);
        } elseif ($mode == "text") {
            $this->output =
                $this->generateText($blurbJson) .
                $this->generateText($contentJson);
            $this->output = trim($this->output);
            if ($wordLimit) {
                $this->output = Str::words($this->output, $wordLimit);
            }
            if ($textTag && $this->output) {
                $this->output = "<$textTag>$this->output</$textTag>";
            }
        }
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return $this->output;
    }

    private function generateHtml($json)
    {
        // json should be array of elements
        if (empty($json)) {
            return "";
        }

        $result = "";
        foreach ($json as $element) {
            $result .= $this->generateHtmlElement($element);
        }
        return $result;
    }

    private function generateText($json)
    {
        // basically collecting all the text nodes

        $result = "";
        foreach ($json as $element) {
            $result .= $this->generateTextElement($element);
        }
        return $result;
    }

    private function generateTextElement($element, $skipTypes = [])
    {
        if (
            !empty($skipTypes) &&
            isset($element->type) &&
            in_array($element->type, $skipTypes)
        ) {
            return "";
        }
        if (isset($element->text)) {
            return $element->text;
        }
        $children = [];
        if (!empty($element->children)) {
            foreach ($element->children as $child) {
                $childText = $this->generateTextElement($child, $skipTypes);
                if ($childText) {
                    $children[] = $childText;
                }
            }
        }
        return implode("", $children) . "\n";
    }

    private function processPageclass(&$elements)
    {
        $this->output = collect($elements)
            ->where("type", "iframe")
            ->pluck("layout")
            ->unique()
            ->map(fn($layout) => "has-iframe-embed-$layout")
            ->join(" ");
    }

    private function processFootnotes(&$elements)
    {
        if (empty($elements)) {
            return;
        }
        foreach ($elements as $id => $element) {
            if (!empty($element->type)) {
                if (
                    $element->type == "footnote-anchor" &&
                    isset($element->ref)
                ) {
                    $uuid = $element->ref;
                    if (!isset($this->footnoteAnchors[$uuid])) {
                        $this->footnoteAnchors[$uuid] = [];
                    }
                    $element->anchorOrder = chr(
                        97 + count($this->footnoteAnchors[$uuid])
                    );
                    $this->footnoteAnchors[$uuid][] = $element;
                    if (!isset($this->footnoteUuids[$uuid])) {
                        $this->footnoteUuids[$uuid] =
                            count($this->footnoteUuids) + 1;
                    }
                } elseif (
                    $element->type == "footnote" &&
                    isset($element->uuid)
                ) {
                    $this->footnotes[] = $element;
                    unset($elements[$id]);
                }
            }
            if (!empty($element->children)) {
                $this->processFootnotes($element->children);
            }
        }
    }

    private function reorderFootnotes(&$json)
    {
        $count = count($this->footnotes);
        usort($this->footnotes, function ($a, $b) use ($count) {
            $orderA = isset($this->footnoteUuids[$a->uuid])
                ? $this->footnoteUuids[$a->uuid]
                : $count;
            $orderB = isset($this->footnoteUuids[$b->uuid])
                ? $this->footnoteUuids[$b->uuid]
                : $count;
            return $orderA - $orderB;
        });
        $json = array_merge($json, $this->footnotes);
    }

    private function generateHtmlElement($element)
    {
        if (!isset($element->type) && isset($element->text)) {
            $result = $element->text;
            if (preg_match("/^\w/", $result)) {
                $result = " " . $result;
            }
            if (isset($element->bold)) {
                $result = "<strong>$result</strong>";
            }
            if (isset($element->italic)) {
                $result = "<em>$result</em>";
            }
            return $result;
        }
        $children = [];
        if (!empty($element->children)) {
            foreach ($element->children as $child) {
                $childText = $this->generateHtmlElement($child);
                if ($childText) {
                    $children[] = $childText;
                }
            }
        }
        $children = trim(implode("", $children));
        $item = null;
        if (isset($element->dataId)) {
            $item = Item::find($element->dataId);
        }
        $floatClass = "";
        $classList = [];
        if (isset($element->float)) {
            $floatClass = "float-" . $element->float;
            $classList[] = $floatClass;
        }
        $variantClass = "";
        if (isset($element->variant)) {
            $variantClass = $element->variant;
            $classList[] = $variantClass;
        }
        $classes = count($classList)
            ? ' class="' . implode(" ", $classList) . '"'
            : "";
        switch (optional($element)->type) {
            case "caption":
                return $children ? "<figcaption>$children</figcaption>" : "";
            case "cite":
                return "<cite>$children</cite>";
            case "footnote-anchor":
                $ref = isset($element->ref) ? $element->ref : "";
                $order = isset($this->footnoteUuids[$ref])
                    ? $this->footnoteUuids[$ref]
                    : "*";
                $anchorOrder = isset($element->anchorOrder)
                    ? $element->anchorOrder
                    : "a";
                return "&nbsp;<sup class=\"footnote-anchor\"><a class=\"footnote-anchor-target\" id=\"$ref\_$anchorOrder\"></a><a href=\"#$ref\">[$order]</a></sup>";
            case "heading":
                $level = $element->level ?? 3;
                return "<h$level>$children</h$level>";
            case "heading-3":
                return "<h3>$children</h3>";
            case "heading-4":
                return "<h4>$children</h4>";
            case "heading-5":
                return "<h5>$children</h5>";
            case "heading-6":
                return "<h6>$children</h6>";
            case "link":
                $url = isset($element->url) ? $element->url : "";
                $linkClass = "";
                if (isset($element->linkType)) {
                    switch ($element->linkType) {
                        case "external":
                            $linkClass = "link-external";
                            break;
                        case "resource":
                            $linkClass = "link-external";
                            if (isset($item->content->links[0]->url)) {
                                $url = $item->content->links[0]->url;
                            } else {
                                $linkClass .= " link-broken";
                            }
                            break;
                        case "internal-item":
                            $linkClass = "link-internal";
                            if ($item) {
                                $link = new Link($item);
                                $url = $link->href;
                            }
                            break;
                        case "internal-collection":
                            break;
                    }
                }
                if (
                    isset($element->dataType) &&
                    $element->dataType == "link-internal"
                ) {
                    $linkClass = "link-internal";
                } elseif (
                    isset($element->dataType) &&
                    $element->dataType == "link"
                ) {
                    // external link
                    $linkClass = "link-external";
                }
                $target =
                    $linkClass == "link-external" ? ' target="_blank" ' : "";
                return " <a target='_blank' class=\"$linkClass\" href=\"$url\" $target>$children</a>";
            case "list-item":
            case "li":
                return "<li$classes>$children</li>";
            case "lic": // list-item-content, from plate list plugin
                return $children;
            case "ordered-list":
            case "ol":
                return "<ol$classes>$children</ol>";
            case "p":
            case "paragraph":
                return "<p>$children</p>";
            case "unordered-list":
            case "ul":
                return "<ul$classes>$children</ul>";
            default:
                return "<p>$children</p>";
        }
        return $children;
    }

    private function findChildOfType(array $children, string $type)
    {
        foreach ($children as $child) {
            if (isset($child->type) && $child->type == $type) {
                return $child;
            }
            if (!empty($child->children)) {
                $findSub = $this->findChildOfType($child->children, $type);
                if ($findSub) {
                    return $findSub;
                }
            }
        }
        return null;
    }
}
