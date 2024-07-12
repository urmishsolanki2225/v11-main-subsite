@isset($special['top_video'])
    @include('shared.cards.resource.video', [
        'item' => $special['top_video'],
        'firstColl' => null,
    ])
@endisset 
