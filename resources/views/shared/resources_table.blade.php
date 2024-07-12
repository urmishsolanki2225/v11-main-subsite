
    @include('shared.resources.header')
   
    @foreach ($resources as $resource)
        @includeFirst(['shared.resources.row_'.$resource->subtype, 'shared.resources.row'])
    @endforeach
   

