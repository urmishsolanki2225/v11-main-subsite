@php
$name=(\Request::route()->getName());
@endphp
<div class="breadcrumbs">
    @if(isset($item))
        {{ Breadcrumbs::render($name, $item) }}
    @elseif(isset($collection))
        {{ Breadcrumbs::render($name, $collection) }}
    @else
        {{ Breadcrumbs::render($name) }}
    @endif
</div>