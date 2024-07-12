<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>
    <style>
        header {
            position: fixed;
            top: 0px;
            left: 0px;
            right: 0px;
            height: 50px;

            /** Basic styling **/
            background-color: #2d97ca;
            border-bottom: 2px solid #ddd;
        }
        footer {
            position: fixed;
            bottom: 0px;
            left: 0px;
            right: 0px;
            height: 45px;

            /** Basic styling **/
            background-color: #2d97ca;
            border-top: 2px solid #ddd;
            margin-top: 30px;
            display: block;
        }

        @page {
            margin: 0cm 0cm;
        }
        body {
            margin: 2cm 0cm 2cm;
            font-family: sans-serif;
        }
        .report-title {
            text-align: left;
            font-weight: 700;
        }
        h1, h2, h3, h4, h5, h6, p, ul {
            margin-top: 5px;
            margin-bottom: 5px;
        }
        .fornt-page-logo{
            padding-top:320px;
            padding-bottom:100px;
        }
		h1,h2,h3,h4,h5,h6{
			color: #0081bf;
			margin-top: 5px;
			margin-bottom: 5px;
		}
		.listing-info ul{
			margin-top: 5px;
			margin-bottom: 5px;
		}
		p{
			font-size: 16px;
			line-height: normal;
			color: #000;
            margin-bottom: 15px;
		}
        .highlights_span{
            margin-bottom: 5px;
            display: block;
            padding-left:40px;
        }
        .highlights_hr{
            margin-bottom: 0;
            margin-top: 15px;
        }
		h1{
			font-size: 30px;
			line-height: normal;
			font-weight: 700;
		}
		h2{
			font-size: 24px;
			line-height: normal;
			font-weight: 700;
		}
		h3{
			font-size: 20px;
			line-height: normal;
			font-weight: 700;
		}
		h4{
			font-size: 18px;
			line-height: normal;
			font-weight: 400;
		}
        ul.pl-0{
            padding-left: 0px;
        }
        hr{
            color: #0081bf;
        }
		ul.pl-30{
            padding-left:30px;
        }
        .related-items{
            margin-bottom: 10px;
        }
        .adjusted-page-num{
             color: #0081bf;
        }
        .month-title{
            color: #2d97ca; font-size: 20px;
            font-weight:700;
        }
        .social-profiles{
            color: #2d97ca; /* Corrected color value */
            cursor: pointer;
            text-decoration: none;
        }
        p a {
            color: #2caddb !important;
            text-decoration: none;
        }
        .content-ul{
            list-style-type: none;
            margin-top: 0px;
            margin-bottom: 15px;
        }
        .content-ul li a {
            line-height: 1.3;
        }
        .pb-0{
            padding-bottom:0px;
        }
        span.mb-10{
            margin-bottom: 15px;
            margin-top:15px;
            display: inline-block;
        }
        .highlight-div h3{
            font-weight:normal;
        }
        .headline-list h3{
            font-weight:normal;
        }
        #summary{
            margin-bottom: 10px;
            display: inline-block;
        }
        .sub-content ul li,
        .sub-content ol li{
            color:#000;
            font-size:16px;
            line-height:1.3;
        }
        .sub-content h3 {
            font-size: 18px;
            color: #000;
            font-weight: 600;
        }
        .title-div{
            text-align: center;
            padding: 10px;
            background: #f4f4f4
        }
        .month-title-main-div .month-title{
            margin-bottom: 20px;
            display: inline-block;
            margin-top: 10px;
        }
        .month-title-main-div .highlights_span{
            margin-bottom: 10px;
            display: inline-block;
        }
        .related-item-div h3{
            font-size:18px;
            font-weight:400;
        }

        .related-items h4{
            color: #000;
            font-weight: 600;
        }
        body .related-items h3 {
            color: #000;
        }
        .sub-content ul li{
            list-style: disc;
        }
        .related-items a {
            color: #000 !important;
        }
        .related-items a.link-external {
            color: #2caddb !important;
        }
    </style>
</head>
<body>
<header></header>
<footer></footer>
<div style="margin: 0cm 1cm 0cm;">
    <div class="fornt-page-logo" style="text-align: center;">
        <img src="{{ url('images/eiie_icon_2.svg') }}" alt="Image Description" width="200" height="200">
        @if($year)
            <h1>{{ __('eiie.Activity Report') ." ". $year }}</h1>
        @else
            <h1>eiie.- no title</h1>
        @endif
        <p>
            {!! __('eiie.footer_licence') !!}
        </p>
    </div>
    @php
        $images = collect(); //App\Models\AnnualreportImage::where('year', $year)->get();
    @endphp
    <div style="page-break-before: always;">
        <div>
            <div class="title-div">{{ __('eiie.Index') }}</div>
            <div class="index-contnet-div">
                @if(!$images->isEmpty() || (isset($summary_data) && !empty($summary_data->content)))
                    <span class="month-title mb-10">
                        <a href="#summary" style="text-decoration: none; color: inherit;">
                            {{ __('eiie.Summary') }}
                        </a>
                    </span>
                @endif
                @foreach($month_full_name as $key=>$month)
                    @php
                        $annualreportInMonth = $annualreports->where('month', $key);
                        $itemsInMonth = $items->filter(function ($item) use ($key) {
                            return $item?->created_at->format('m') == $key;
                        });
                        $itemsPerHighlight = $annualreportInMonth->count() > 0 ? ceil($itemsInMonth->count() / $annualreportInMonth->count()) : 1;
                        $cnt_highlight = 1;
                        $cnt_headline = 1;
                    @endphp
                    @if ($itemsInMonth->count() != 0 || $annualreportInMonth->count() != 0)
                        <div class="month-title-main-div">
                            <span class="month-title">
                                <a href="#{{$month}}" style="text-decoration: none; color: inherit;">
                                    {{ __('eiie.' . $month) }}
                                </a>
                            </span>
                            @if ($annualreportInMonth->count() != 0)
                                <div>
                                    <span class="highlights_span"><b>{{ __('eiie.Highlights') }}</b></span>
                                    <ul class="content-ul highlights-list">
                                        @foreach($annualreportInMonth as $annualreport)
                                            @isset($annualreport->content)
                                                <li class="content-list highlight-item">
                                                    <a href="#{{$annualreport->content->title}}" style="text-decoration: none; color: inherit;">
                                                        {{$cnt_highlight++}}. {{$annualreport->content->title ? $annualreport->content->title : __('eiie.- no title -')}}
                                                    </a>
                                                </li>
                                            @endisset
                                        @endforeach
                                    </ul>
                                </div>
                            @endif
                            @if ($itemsInMonth->count() != 0)
                                <div>
                                    <span class="highlights_span"><b>{{ __('eiie.Headlines') }}</b></span>
                                    <ul class="content-ul headlines-list">
                                        @foreach($itemsInMonth as $item)
                                            <li class="content-list headline-item">
                                                <a href="#{{ optional($item->content)->title ?? $item->id }}" style="text-decoration: none; color: inherit;">
                                                    {{$cnt_headline++}}. {{ optional($item->content)->title ?: __('eiie.- no title -') }}
                                                </a>
                                            </li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endif
                        </div>
                    @endif
                @endforeach
            </div>
        </div>
    </div>
    <div>
        @if(!$images->isEmpty() || (isset($summary_data) && !empty($summary_data->content)))
            <div style="page-break-before: always;">
                <span class="month-title" id="summary">{{ $summary_data->content->title ?? __('eiie.Summary') }}</span>
                @if(!$images->isEmpty())
                    @foreach ($images as $image)
                        <picture>
                            <img src="{{ url($image->path .'/card.jpg') }}" alt="Image for the year {{ $year }}">
                        </picture>
                    @endforeach
                @endif
                @if(isset($summary_data) && !empty($summary_data->content))
                        <li style="list-style-type: none;">
                            <div>
                                <x-render-content :content="$summary_data->content" />
                            </div>
                        </li>
                @endif
            </div>
        @endif
    </div>
    <div>
        @foreach($month_full_name as $key=>$month)
            @php
                $annualreportInMonth = $annualreports->where('month', $key);
                $itemsInMonth = $items->filter(function ($item) use ($key) {
                    return $item?->created_at->format('m') == $key;
                });
                $itemsPerHighlight = $annualreportInMonth->count() > 0 ? ceil($itemsInMonth->count() / $annualreportInMonth->count()) : 1;
                $cnt = 1;
                $cnttwo = 1;
                $relatedItemsPrinted = false;
            @endphp
            <div>
                @if ($itemsInMonth->count() != 0 || $annualreportInMonth->count() != 0)
                    <div id="{{$month}}" style="page-break-before: always;">
                        <div style="text-align: center;">
                            <h2>{{__('eiie.' . $month)}}</h2>
                        </div>
                        <hr>
                        <div>
                        <!-- Highlights -->
                        <div>
                        @if($annualreportInMonth->count() > 0)
                            <h3>{{ __('eiie.Highlights') }}</h3>
                            @foreach($annualreportInMonth as $annualreport)
                            @isset($annualreport->content)
                            <ul class="pl-0" style="list-style-type: none;">
                                <div class="highlight-div">
                                    <h3 id="{{$annualreport->content->title}}">{{$cnt}}. {{$annualreport->content->title ? $annualreport->content->title : __('eiie.- no title -')}}
                                    </h3>
                                    <x-annual-report.render-content-pdf :content="$annualreport->content" />
                                </div>
                                <!-- related items for highlight -->
                                <div class="related-item-div">
                                    @if(count($annualreport->items) > 0)
                                        <ul class="pl-30">
                                            @foreach($annualreport->items as $item)
                                                @if(($item->type === 'article' || $item->type === "library"))
                                                @if(!$relatedItemsPrinted)
                                                    <h3>{{ __('eiie.Related Items') }}</h3>
                                                    @php $relatedItemsPrinted = true; @endphp
                                                @endif
                                                <div class="related-items">
                                                    <h4>
                                                    {{ isset($item->content->title) ? $item->content->title : __('eiie.- no title -') }}
                                                    </h4>
                                                    <p style="list-style-type:none; margin-bottom:0px;">
                                                        <x-annual-report.render-content-pdf :content="$item->content"/>
                                                    </p>
                                                </div>
                                                @endif

                                            @endforeach
                                        </ul>
                                    @endif
                                </div>
                                <!-- related items end -->
                            </ul>
                            @endisset
                            @php $cnt++;@endphp
                            @endforeach
                        @endif
                        </div>
                        </div>
                        @if($annualreportInMonth->count() != 0)
                        <div style="list-style-type: none; page-break-before: always;">
                        @else
                        <div style="list-style-type: none;">
                        @endif
                            @if ($itemsInMonth->count() != 0)
                            <h3>{{ __('eiie.Headlines') }}</h3>
                            <ul style="list-style-type: none; padding-left: 0px;" >
                                @foreach($annualreportInMonth as $annualreport)
                                    @php
                                        $itemsForHighlight = $itemsInMonth->splice(0, $itemsPerHighlight);
                                    @endphp
                                    @foreach($itemsForHighlight as $item)
                                        <div class="headline-list">
                                        <h3 id="{{ optional($item->content)->title ?? $item->id }}">{{$cnttwo++}}. {{ optional($item->content)->title ?: __('eiie.- no title -') }}</h3>
                                            <div class="sub-content">
                                                <x-annual-report.render-content-pdf :content="$item->content" />
                                            </div>
                                        </div>
                                    @endforeach
                                @endforeach

                                @foreach($itemsInMonth as $item)
                                    <div class="headline-list">
                                        <h3 id="{{ optional($item->content)->title ?? $item->id }}">{{$cnttwo++}}. {{ optional($item->content)->title ?: __('eiie.- no title -')}}</h4>
                                        <div class="sub-content">
                                            <x-annual-report.render-content-pdf :content="$item->content" />
                                        </div>
                                    </div>
                                @endforeach
                            </ul>
                            @endif
                        </div>
                    </div>
                @endif
            </div>
        @endforeach
    </div>
</div>
</body>
</html>