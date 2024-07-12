@if (count($authors) > 0)
<span class="authors">
<span class="label">{{ __('eiie.written by') }}:</span>
@foreach ($authors as $author)
    <span class="author">
        <x-link :collection="$author" />
    </span>
@endforeach
</span>
@endif
