<section id="country_subnavigation">
    @php
        $linkOverview = route('subsite.country', [
                'id' => $collection->id,
                'slug' => $collection->content->slug
            ]);
        $linkArticles = route('subsite.country.articles', [
                'id' => $collection->id,
                'slug' => $collection->content->slug
            ]);
        $classOverview = Route::current()->getName() == 'subsite.country' ? 'active' : 'inactive';
        $classArticles = Route::current()->getName() == 'subsite.country.articles' ? 'active' : 'inactive';
    @endphp
    <a href="{{ $linkOverview }}"
        class="{{ $classOverview }}"
        >{{ __('eiie.Overview') }}</a>
    <a href="{{ $linkArticles }}"
        class="{{ $classArticles }}"
        >{{ __('eiie.Articles') }}</a>
    <a href="{{ $linkOverview }}#affiliates"
        >{{ __('eiie.Affiliates') }}</a>
</section>