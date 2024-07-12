@isset($special['top_link']->content)
    @php    
        $url = isset($special['top_link']->content->links[0])
                ? $special['top_link']->content->links[0]->url
                : (isset($special['top_link']->content->contact->website) 
                    ? $special['top_link']->content->contact->website
                    : false
                    )
                ;
    @endphp 
    @if($url) 
        <div class="special_top_link">
            <a href="{{ $url }}" rel="noopener" class="external">{{ $special['top_link']->content->title ?? $url }}</a>
        </div>
    @endif
@endisset 
