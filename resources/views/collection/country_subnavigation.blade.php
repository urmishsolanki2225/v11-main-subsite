<section id="country_subnavigation">
    @php 
        $linkOverview = route('country', [ 
                'id' => $collection->id, 
                'slug' => $collection->content->slug 
            ]);
        $linkArticles = route('country.articles', [ 
                'id' => $collection->id, 
                'slug' => $collection->content->slug 
            ]);
        $linkDCProjects = route('country.dcprojects', [ 
                'id' => $collection->id, 
                'slug' => $collection->content->slug 
            ]);
        $classOverview = Route::current()->getName() == 'country' ? 'active' : 'inactive';
        $classArticles = Route::current()->getName() == 'country.articles' ? 'active' : 'inactive';
        $classDCProjects = Route::current()->getName() == 'country.dcprojects' ? 'active' : 'inactive';
    @endphp 
    <a href="{{ $linkOverview }}"
        class="{{ $classOverview }}"
        >{{ __('eiie.Overview') }}</a>
    <a href="{{ $linkArticles }}"
        class="{{ $classArticles }}"
        >{{ __('eiie.Articles') }}</a>
    @if (isset($groupedItems['dcproject']) || (!isset($groupedItems) && count($collection->itemsOfType('dcproject'))))
        <a href="{{ $linkDCProjects }}"
            class="{{ $classDCProjects }}"
        >{{ __('eiie.Development Cooperation Projects') }}</a>
    @endif
    <a href="{{ $linkOverview }}#affiliates"
        >{{ __('eiie.Affiliates') }}</a>
    
    {{--
    @foreach ($collection->slotItems as $slotItem)        
        <a href="{{ route('country.slot', [
                    'id' => $collection->id, 
                    'slug' => $collection->content->slug,
                    'slotId' => $slotItem->id,
                    'slotSlug' => $slotItem->slot->title->slug
                ]) }}" 
            class="{{ $slotItem->id == $activeSlotId ? 'active' : '' }}"
            >{{ $slotItem->slot->title->title }}</a>
    @endforeach
    --}}

</section>
