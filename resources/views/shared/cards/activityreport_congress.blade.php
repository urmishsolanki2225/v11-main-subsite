@php
    $years =  [
        "year_from" => $item->activityReportCongress->year_from,
        "year_to" => $item->activityReportCongress->year_to
    ];
@endphp
<article class="card-item card-activityreport_congress {{ $stickyClass ?? '' }}">

    <header>
        <h{{ $header_level ?? '3'}}>{{ $item->content->title ?? "" }}</h{{ $header_level ?? '3'}}>
        <span class="card-activityreport_congress-period">
            {{ __('eiie.Report :year_from - :year_to', $years) }}
        </span>
    </header>

    <x-figure class=" " :item="$item" preset="card" />
    <a href={{ route('governance.reports.world-congress-report', $years) }}>{{ $item->content->title ?? "" }}</a>

</article>
