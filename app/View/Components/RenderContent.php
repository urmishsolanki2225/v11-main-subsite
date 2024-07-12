<?php

namespace App\View\Components;

use Illuminate\View\Component;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

use App\Models\Item;
use App\Actions\OEmbed;
use App\Models\GeodataMap;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Log;

class RenderContent extends Component
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
        $contentOnly = false,
        $sentenceLimit = null
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
            if ($sentenceLimit) {
                $sentences = [];
                preg_match_all("/.+?\.\s/", $this->output . " ", $sentences);
                $sentences = array_slice($sentences[0], 0, $sentenceLimit);
                $this->output = join($sentences);
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
        // get all uuids of footnote-anchors, assign them an order
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
            case "blockquote":
                return "<blockquote>$children</blockquote>";
            case "caption":
                return $children ? "<figcaption>$children</figcaption>" : "";
            case "cite":
                return "<cite>$children</cite>";
            case "footnote":
                $uuid = isset($element->uuid) ? $element->uuid : "";
                $order = isset($this->footnoteUuids[$uuid])
                    ? $this->footnoteUuids[$uuid]
                    : "*";
                $anchors = isset($this->footnoteAnchors[$uuid])
                    ? $this->footnoteAnchors[$uuid]
                    : [];
                $anchorLinks = "";
                if (count($anchors) > 1) {
                    $anchorLinks = "^<sup> ";
                    foreach ($anchors as $anchor) {
                        $anchorLinks .= " <a href=\"#$uuid\_$anchor->anchorOrder\">$anchor->anchorOrder</a> ";
                    }
                    $anchorLinks .= "</sup>";
                } elseif (count($anchors)) {
                    $anchorLinks = "<a href=\"#$uuid\_a\">^</a>";
                }
                return "<div class=\"footnote\"><span class=\"footnote-order\">$order. $anchorLinks</span> <a class=\"footnote-target\" id=\"$uuid\"></a>$children</div>";
            case "footnote-anchor":
                $ref = isset($element->ref) ? $element->ref : "";
                $order = isset($this->footnoteUuids[$ref])
                    ? $this->footnoteUuids[$ref]
                    : "*";
                $anchorOrder = isset($element->anchorOrder)
                    ? $element->anchorOrder
                    : "a";
                return "&nbsp;<sup class=\"footnote-anchor\"><a class=\"footnote-anchor-target\" id=\"$ref\_$anchorOrder\"></a><a href=\"#$ref\">[$order]</a></sup>";
            case "iframe":
                if (empty($element->url)) {
                    return "";
                }
                $layout = isset($element->layout) ? $element->layout : "full";
                $height = isset($element->height) ? $element->height : 400;
                return "<div class=\"iframe-embed layout-$layout\"><iframe src=\"$element->url\" height=\"$height\"></iframe></div>";
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
            case "image":
                $url = isset($element->url) ? $element->url : "";
                if ($item) {
                    $figure = new Figure(
                        $item,
                        "any",
                        false,
                        0,
                        false,
                        false,
                        "inline"
                    );
                    $url = $figure->url;
                }
                return "<figure class=\"image $floatClass\"><img src=\"$url\">$children</figure>";
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
                return " <a class=\"$linkClass\" href=\"$url\" $target>$children</a>";
            case "list-item":
            case "li":
                return "<li$classes>$children</li>";
            case "oembed":
                if (isset($element->url)) {
                    $data = OEmbed::load($element->url);
                    if (!$data) {
                        return "";
                    }
                    try {
                        $html = isset($data->code->html)
                            ? $data->code->html
                            : (isset($data->code) &&
                            Str::startsWith($data->code, "<")
                                ? $data->code
                                : "");
                        return "<section class=\"social-embed social-embed-$data->providerName $floatClass\">$html</section>";
                    } catch (\Error $err) {
                        Log::debug($err);
                    }
                }
                return "";
            case "lic": // list-item-content, from plate list plugin
                return $children;
            case "ordered-list":
            case "ol":
                return "<ol$classes>$children</ol>";
            case "p":
            case "paragraph":
                return "<p>$children</p>";
            case "quote":
                $longQuoteClass = "";
                if (strlen($children) > 200) {
                    $longQuoteClass = "long-quote";
                }
                if (strlen($children) > 500) {
                    $longQuoteClass .= " xlong-quote";
                }
                $socialShare = "";
                if (
                    isset($element->showSocialShare) &&
                    $element->showSocialShare
                ) {
                    $shareUrl = "";
                    $shareText = trim(
                        $this->generateTextElement($element, ["caption"])
                    );
                    // $subImage = $this->findChildOfType(
                    //     $element->children,
                    //     "image"
                    // );
                    // if ($subImage) {
                    //     $shareUrl = request()->fullUrlWithQuery([
                    //         "_sharemg" => $subImage->dataId,
                    //     ]);
                    //     // $item = Item::find($subImage->dataId);
                    //     // if ($item) {
                    //     //     $figure = new Figure(
                    //     //         $item,
                    //     //         "any",
                    //     //         false,
                    //     //         0,
                    //     //         false,
                    //     //         false,
                    //     //         "inline"
                    //     //     );
                    //     //     $shareUrl = url($figure->url);
                    //     //     $shareUrl = route("item.show", ["id" => $item->id]);
                    // }

                    // if (!$shareUrl) {
                    //     $shareUrl = url()->current();
                    // }
                    $socialShare =
                        '<div class="social_share_links">
                        <span class="social_share_invite">' .
                        __("eiie.Click on the icon to share this message") .
                        '</span>
                        <a class="social_share_link_twitter" target="_blank" href="https://twitter.com/intent/tweet?text=' .
                        urlencode(Str::limit($shareText, 400)) .
                        // "&url=" .
                        // urlencode($shareUrl) .
                        '">twitter</a>' .
                        /*
                        <a class="social_share_link_facebook" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=' .
                        urlencode($shareUrl) .
                        "&display=page&quote=" .
                        urlencode($shareText) .
                        '">facebook</a>
                        */
                        '<a class="social_share_link_whatsapp" target="_blank" href="https://wa.me/?text=' .
                        urlencode(
                            Str::limit($shareText, 400)
                            // " " .
                            // $shareUrl
                        ) .
                        '">whatsapp</a>
                    </div>';
                }
                return "<figure class=\"quote $floatClass $longQuoteClass\">$children $socialShare</figure>";
            case "unordered-list":
            case "ul":
                return "<ul$classes>$children</ul>";
            case "video":
                $url = self::getVideoUrl($item);
                if (!$url) {
                    $url = isset($element->url) ? $element->url : "";
                }
                return "<figure class=\"video $floatClass\"><div class=\"video-container\"><iframe src=\"$url\" allow=\"fullscreen; picture-in-picture\" allowfullscreen=\"true\"></iframe></div>$children</figure>";
            case "map":
                if (!isset($element->mapId)) {
                    return "";
                }
                $mapRender = view("shared.geodata-map", [
                    "mapId" => $element->mapId,
                    "showLegend" => $element->showLegend,
                ]);
                return "<figure class=\"map\">{$mapRender}{$children}</figure>";
            default:
                // return json_encode($element);
                return "<p>$children</p>";
        }
        return $children;
    }

    public static function getVideoUrl($item)
    {
        if (
            !isset($item->subtype) ||
            $item->subtype != "video" ||
            empty($item->content->videos)
        ) {
            return;
        }
        $video = $item->content->videos[0];
        switch ($video->provider) {
            case "youtube":
                return "https://www.youtube-nocookie.com/embed/$video->provider_id";
            case "vimeo":
                return "https://player.vimeo.com/video/$video->provider_id";
        }
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

/*
public static function renderJson(string $jsonStr) {
        $json = json_decode($jsonStr);

        foreach ($json as $ele) {
            self::render($ele);
        }
    }

    private static function render($ele) {
        if (!isset($ele->type)) {
            echo $ele->text;
            return;
        }
        switch ($ele->type) {
            case 'paragraph':
                echo '<p>';
                self::renderChildren(($ele));
                echo '</p>';
                break;
            default:
                echo json_encode($ele);
        }
    }

    private static function renderChildren($ele) {
        foreach ($ele->children as $child) {
            self::render($child);
        }
    }
*/
