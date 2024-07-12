@extends('main')

@php 
$supportColor = hex_2_rgb_tuple($summary->support_color)
@endphp 

@section('title', $title)
@section('support_color', $supportColor)

@section('content')

@php 
$videoEmbedUrl = empty($summary->videoItem) ? false : \App\View\Components\RenderContent::getVideoUrl($summary->videoItem);
@endphp 


@isset($summary)
<article class="annual_report_summary" id="summary">
	
	<div class="summary-text">
		<div class="summary-text-blurb">
		<h2>{{ $title }}</h2>
		<h3>{{ $summary->content->title ?? '' }}</h3>
			<x-render-content :content="$summary->content" blurbOnly />
			@if ($videoEmbedUrl)
				<figure class="video">
					<div class="video-container">
						<iframe src="{{ $videoEmbedUrl }}" 
							allow="fullscreen; picture-in-picture" 
							allowfullscreen="true">
						</iframe>
					</div>
					<figcaption>{{$summary->videoItem->content->title ?? ''}}</figcaption>
				</figure>
			@elseif (!empty($summary->allImages))
				<x-figure :item="count($summary->allImages) > 1 ? $summary->allImages[1] : $summary->allImages[0]" type="card" includeCaption />
			@endif 
		</div>
		<div class="summary-text-full">
			<x-render-content :content="$summary->content" contentOnly />
		</div>
	</div>
	@if (!empty($summary->content->content_json))
		<a onClick="toggleTextAndClass(this)">{{ __('eiie.Read more') }}</a>
	@endif
	
	@if($pdfLink)
		<a href={{ $pdfLink }} class="annual_report_download_link">{{ __('eiie.Download PDF') }}</a>
	@endif
		
</article>
@endisset

@php 
$showYears = isset($showYears) ? !!$showYears : false;
@endphp


<div class="timeline">
	 <div class="line"></div>
	@foreach ($report as $year => $months)
		@if ($showYears)
			<h3>{{ $year }}</h3>
		@endif
		@foreach ($months as $month => ['headlines' => $headlines, 'highlights' => $highlights])
			@php 
				$monthName = ucfirst(Carbon\Carbon::now()
										->startOfMonth()
										->set("month", $month)
										->set("year", $year)
										->isoFormat("MMMM")
									);
				$backLinkQuery = [
					'annual-report-year' => $year,
					'month' => $monthName
				];
				if (isset($yearFrom) && isset($yearTo)) {
					$backLinkQuery['congress-years'] = $yearFrom .'-'. $yearTo;
				}
			@endphp
			@if(!empty($headlines) || !empty($highlights))
				<section class="timeline_section">
					<h{{ $showYears ? '4' : '3' }} id="{{ $year.'/'.$monthName }}"><span>
						{{ $monthName }}
					</span></h{{ $showYears ? '4' : '3' }}>
					@php
						$headlinesPerHighlight = empty($highlights) 
								? count($headlines) 
								: ceil(count($headlines) / count($highlights));
						$headlinesOffset = 0;
					@endphp 
					@foreach ($highlights as $highlight)
						<article @class(['timeline_article timeline_article_featured',
											'timeline_article_featured_left' => $loop->odd,
											'timeline_article_featured_right' => $loop->even])>
							@if (!empty($highlight->allImages))
								<x-figure :item="$highlight->allImages->first()" type="card" />
							@endif
							<span class="date">
								{{ Carbon\Carbon::now()->startOfMonth()->set('month', $month)->set('year', $year)->isoFormat('MMMM YYYY') }}
							</span>
							<h{{ $showYears ? '5' : '4' }}>
								{{ $highlight->content->title }}
							</h{{ $showYears ? '5' : '4' }}>
							{{--
							<p>
								<x-render-content :content="$highlight->content" mode="text" sentenceLimit="1" XwordLimit="{{ config('eiie.blurb-word-limit', 50) }}" />
							</p>
							--}}
							<a href="{{ 
								route('governance.reports.annual-report.showHighlight', [
									'year' => $highlight->year, 
									'id' => $highlight->id, 
									'slug' => Str::slug($highlight->content->title ?? ''),
									...$backLinkQuery
								]) }}"><span>{{ __('eiie.Read more') }}</span></a>
						</article>
						@if ($headlinesOffset < count($headlines))
							<div @class(['timeline_section_stack', 
											'timeline_section_stack_left' => $loop->even,
											'timeline_section_stack_right' => $loop->odd])>
								@for ($idx = $headlinesOffset; $idx < $headlinesOffset + $headlinesPerHighlight; ++$idx)
									@if (!empty($headlines[$idx]))
										@include('reports.annual-report_headline', [
											'headline' => $headlines[$idx],
											'headlineLevel' => $showYears ? 5 : 4
										])
									@endif
								@endfor
								@php $headlinesOffset += $headlinesPerHighlight; @endphp
							</div>
						@endif
					@endforeach
					@if ($headlinesOffset + 1 < count($headlines))
						<div class="timeline_section_stack_last">
							@for ($idx = $headlinesOffset; $idx < count($headlines); ++$idx)
								@include('reports.annual-report_headline', [
									'headline' => $headlines[$idx],
									'headlineLevel' => $showYears ? 5 : 4,
									'backLinkQuery' => $backLinkQuery
								])
							@endfor
						</div>
					@endif
				</section>
			@endif
		@endforeach
	@endforeach
</div>


<script>
document.addEventListener("DOMContentLoaded", function () {
    const handleIntersect = (entries, observer) => {
    entries.forEach(entry => {
        entry.target.classList.toggle('visible', entry.isIntersecting);
    });
};

// Create the IntersectionObserver
const observer = new IntersectionObserver(handleIntersect, {
    root: null,
    rootMargin: '50px 0px',
    threshold: [0, 0.25, 0.5, 0.75, 1.0]
});

// Select all .timeline_article elements
const articles = document.querySelectorAll('.timeline_article');



// Observe all .timeline_article elements
articles.forEach(article => observer.observe(article));
// Ensure the first .timeline_article is visible on load
if (articles.length > 0) {
    articles[0].classList.add('visible');
}

    const summaryTextFull = document.querySelector('.summary-text-full');
    const children = Array.from(summaryTextFull.children);

    const column1 = document.createElement('div');
    const column2 = document.createElement('div');
    column1.classList.add('column');
    column2.classList.add('column');

    const midpoint = Math.ceil(children.length / 2);

    children.forEach((child, index) => (index < midpoint ? column1 : column2).appendChild(child));

    summaryTextFull.append(column1, column2);
});

const toggleTextAndClass = (link) => {
    const summary = document.getElementById('summary');
    summary.classList.toggle('show-fulltext');

    link.textContent = summary.classList.contains('show-fulltext') ? "{{ __('eiie.Hide text') }}" : "{{ __('eiie.Read more') }}";

    if (!summary.classList.contains('show-fulltext')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const line = document.querySelector('.line');
    const timeline = document.querySelector('.timeline');

    // Ensure the line is displayed
    line.style.display = 'block';

    const handleScroll = () => {
        if (window.innerWidth > 748) {
            const timelineRect = timeline.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate the progress of the scroll
            const scrollableHeight = document.documentElement.scrollHeight - viewportHeight;
            const scrollProgress = window.scrollY / scrollableHeight;

            // Calculate the new height of the line based on scroll progress
            const newHeight = scrollProgress * timelineRect.height;
            line.style.height = `${newHeight}px`;
        } else {
            // Reset the line height if viewport width is <= 748px
            line.style.height = '0px';
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Also handle resize events to ensure functionality on viewport width change
    window.addEventListener('resize', handleScroll);
});





</script>

@endsection
