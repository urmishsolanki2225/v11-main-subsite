<article 
        class="card card_annual_report" 
        @style([
            'background-color: #'.$item->support_color => $item->support_color,
            '--card-support-color: '.hex_2_rgb_tuple($item->support_color) => $item->support_color
        ])
>   
    @if(!empty($item->allImages[0]))
        <x-figure class=" " :item="$item->allImages[0]" preset="card" />
    @endif
    @if($item->support_color)
        <div class="card-support-color" @style(['background-color: #'.$item->support_color => $item->support_color])></div>
    @endif
    <h{{ $header_level ?? '3'}}>{{ $item->year }}</h{{ $header_level ?? '3'}}>
    <a href={{ route('governance.reports.annual-report.show', ['year' => $item->year]) }}>{{ $item->year }}</a>
</article>