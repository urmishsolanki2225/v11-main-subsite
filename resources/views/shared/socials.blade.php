@section('head')
    @parent
    <link rel="me" href="https://twitter.com/EduInt" />
    <meta name="twitter:dnt" content="on" >
    {{-- 
    <meta name="twitter:widgets:theme" content="ligt">
    <meta name="twitter:widgets:border-color" content="#ff00ff">
    --}}

    @php 
        $metaUrl = url()->current();
        $route = Route::currentRouteName();
        $metaTarget = $route == 'item.show' && isset($item) ? $item : (isset($collection) ? $collection : false);
        $sharedImageId = request()->input('_sharemg');
        $sharedImageUrl = '';
        if ($sharedImageId) {
            $sharedImage = \App\Models\Item::find($sharedImageId);
            if ($sharedImage) {
                $sharedImageFigure = new \App\View\Components\Figure($metaTarget);
                $sharedImageUrl = url($sharedImageFigure->url);
            }
        }
        if ($metaTarget) {
            $metaContent = new \App\View\Components\RenderContent(
                $metaTarget->content,
                'text',
                null,
                null,
                true // blurbOnly
            );
            $metaDescription = $metaContent->output
                                ? $metaContent->output
                                : strip_tags(__('eiie.home_intro'))
                                ;
            $metaFigure = new \App\View\Components\Figure($metaTarget);
            $metaImage = $metaFigure->url;
        } else {
            $metaDescription = strip_tags(__('eiie.home_intro'));
        }
        $metaType = $metaTarget ? 'article' : 'website';
    @endphp 

    <meta property="og:url" content="{{ $metaUrl }}" />
    <meta property="og:title" content="{{ $metaTarget->content->title ?? __('eiie.Education International') }}" />
    <meta property="twitter:title" content="{{ $metaTarget->content->title ?? __('eiie.Education International') }}" />
    <meta name="description" content="{{ $metaDescription }}" />
    <meta property="og:description" content="{{ $metaDescription }}" />
    <meta property="twitter:description" content="{{ $metaDescription }}" />
    <meta property="og:site_name" content="{{ __('eiie.Education International') }}" />
    <meta name="twitter:site" content="@eduint" />
    <meta property="og:locale" content="{{ App::getLocale() }}" />

    @if($sharedImageUrl)
        <meta property="og:image" content="{{ $sharedImageUrl }}" />
        <meta name="twitter:card" content="summary_large_image" />
    @elseif(isset($metaFigure->url))
        <meta property="og:image" content="{{ url($metaFigure->url) }}" />
        <meta name="twitter:card" content="summary_large_image" />
    @else 
        <meta name="twitter:card" content="summary" />
    @endisset
    
    @if($metaTarget) 
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={{ 
            $metaTarget->publish_at ?? $metaTarget->created_at
        }} />
        <meta property="article:modified_time" content={{ 
            $metaTarget->updated_at
        }} />
    @else 
        <meta property="og:type" content="website" />
    @endif

@endsection 
