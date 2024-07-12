@extends('main')

@section('head')
    @parent 
    @viteReactRefresh
    @vite(['resources/js/front_app.tsx'])
    @routes
@endsection 

@section('content')
<div class="no_lead_image"></div>

<article class="article_main article_single">
    @inertia
</article>

@endsection 
