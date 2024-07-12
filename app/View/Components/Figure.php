<?php

namespace App\View\Components;

use Illuminate\View\Component;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\View;

class Figure extends Component
{
    public $type; // lead (default), icon, portrait, square (special case)
    // public $item; // Item or Container, with the various images
    public $classNotFound; // to show a div with that class, skipped if not provided
    // public $index; // default 0
    public $class; // css class on the figure
    // public $includeCaption; // include a <figcaption>
    public $caption; // the caption

    public $url; // to be calculated
    public $path; // ToDo also add path, so we can easily upload the image for social sharing
    public $sources;
    public $sizeResponsive;
    public $style = "";

    /**
     * preset=
     *   'lead' => lead size, 1448x762
     *
     * @return void
     */
    public function __construct(
        $item,
        $type = "lead",
        $classNotFound = false,
        $index = 0,
        $class = false,
        $includeCaption = false,
        $preset = ""
    ) {
        if (!$item) {
            return;
        }
        $this->type = $type;
        // $this->item = $item;
        $this->classNotFound = $classNotFound;
        // $this->index = $index;
        $cls = $class ? $class : "figure_" . $type;
        if ($preset) {
            $cls .= " figure_preset_" . $preset;
        }

        $this->class = ' class="' . $cls . '"';

        $itemImage = false;
        $imgs = false;
        if (
            ($item->type == "resource" && $item->subtype == "image") ||
            $item->subtype == "image.portrait"
        ) {
            $itemImage = $item;
        } else {
            switch ($type) {
                case "icon":
                    $imgs = $item->icons;
                    break;
                case "portrait":
                    $imgs = $item->portraitImages;
                    break;
                case "square":
                    // special case, show square on mobile
                    // 20220919 not in use anymore
                    $squareUrl = $this->getImageUrl(
                        $item->squareImages,
                        $index
                    );
                    if ($squareUrl) {
                        $squareUrl .= "?p=square";
                        $this->sources = [
                            [
                                "media" => "(max-width: 639px)",
                                "url" => $squareUrl,
                            ],
                        ];
                    } else {
                        // for testing
                        $squareUrl =
                            $this->getImageUrl($item->images, $index) .
                            "?w=748&h=748&fit=crop&q=80";
                        $squareUrl .= "?p=square";
                        // $squareUrl = 'https://picsum.photos/640/640?'.random_int(0, 999999);
                        $this->sources = [
                            [
                                "media" => "(max-width: 639px)",
                                "url" => $squareUrl,
                            ],
                        ];
                    }
                    $imgs = $item->images; // for the default image and caption
                    break;
                case "any":
                    $imgs = $item->images->concat($item->portraitImages);
                    break;
                default:
                    $imgs = $item->images;
            }
            if (isset($imgs) && count($imgs) > $index) {
                $itemImage = $imgs[$index];
            }
        }
        $imgResource = false;
        if (isset($itemImage->content)) {
            $imgResource = $itemImage->content->images[0];
        } elseif (isset($itemImage->contents) && count($itemImage->contents)) {
            // look for image in another language
            $imgResource = $itemImage->contents[0]->images[0];
        }
        if ($imgResource && $imgResource->path != "placeholder.jpg") {
            //Added by Cyblance for Annual-Reports section start
            if (
                str_starts_with($imgResource->path, "image/") ||
                str_starts_with($imgResource->path, "annual-reports/")
            ) {
                //Added by Cyblance for Annual-Reports section end
                $base = "/" . $imgResource->path;
                if (!$preset) {
                    if ($itemImage->subtype === "image.portrait") {
                        $preset = "portrait";
                    } else {
                        $preset = "lead";
                    }
                }
                switch ($preset) {
                    case "lead":
                        $this->url = url($base . "/lead.jpg");
                        $this->path = $base . "/lead.jpg";
                        $this->sizeResponsive = [
                            "srcset" =>
                                url($base . "/card.jpg") .
                                " 640w," .
                                url($base . "/lead.jpg") .
                                " 1448w",
                            "sizes" => "(max-width: 639px) 100vw," . "1448px",
                        ];
                        break;
                    case "portrait":
                        $this->url = url($base . "/portrait.jpg");
                        $this->path = $base . "/portrait.jpg";
                        break;
                    case "card":
                        $this->url = url($base . "/card.jpg");
                        $this->path = $base . "/card.jpg";
                        break;
                    case "coverpage":
                    case "coverpage_card":
                        $this->url = url($base . "/inline.jpg");
                        $this->path = $base . "/inline.jpg";
                        $this->style =
                            'style="background-color: #' .
                            ($item->support_color ?? "eee") .
                            ';"';
                        break;
                    case "inline":
                    default:
                        $this->url = url($base . "/inline.jpg");
                        $this->path = $base . "/inline.jpg";
                        break;
                }
            } else {
                $prefix = "/img/";
                $baseUrl = str_replace(
                    "img/img",
                    "img",
                    $prefix . $imgResource->path
                );
                $this->url = $baseUrl;
                if ($preset) {
                    $this->url .= "?p=" . $preset;
                } else {
                    switch ($itemImage->subtype) {
                        case "image.portrait":
                            $this->url .= "?w=640&h=640&fit=contain&q=80";
                            break;
                        default:
                            $this->url .= "?p=lead";
                            break;
                    }
                }
                $bgColor = !empty($item->support_color)
                    ? "&bg=" . $item->support_color
                    : "";
                $this->url .= $bgColor;
                if ($type == "lead") {
                    if ($preset) {
                        $mobileSizePreset = $preset . "_mob";
                    } else {
                        $mobileSizePreset = "lead_mob";
                    }
                    $this->sizeResponsive = [
                        "srcset" =>
                            $baseUrl .
                            "?p=" .
                            $mobileSizePreset .
                            $bgColor .
                            " 640w," .
                            $this->url .
                            " 1448w",
                        "sizes" => "(max-width: 639px) 100vw," . "1448px",
                    ];
                }
            }
            if ($includeCaption && isset($itemImage->content->subtitle)) {
                $this->caption = $itemImage->content->subtitle;
            }
        }
    }

    protected function getImageUrl($imgs, $index)
    {
        if (isset($imgs) && count($imgs) > $index) {
            $itemImage = $imgs[$index];
        }
        if (isset($itemImage->content)) {
            $imgRes = $itemImage->content->images[0];
            $prefix = "/img/";
            return str_replace("img/img", "img", $prefix . $imgRes->path);
        }
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        if (!$this->url) {
            if ($this->classNotFound) {
                echo '<div class="' . $this->classNotFound . '"></div>';
            }
            return;
        }
        if ($this->type == "square") {
            return view("components.figure-sources");
        }
        return view("components.figure");
    }
}
