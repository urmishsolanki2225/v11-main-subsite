
@isset ($item->content->files[0])
    <div class="attachment_group attachment_group_itemfiles">
        @include('shared.resources.header')
        
        @includeFirst(
            ['shared.resources.row_file', 'shared.resources.row'], 
            ['resource' => $item, 'header_level' => '4']
        )
    </div>
@endisset 

@foreach ($item->attachmentGroups as $attachmentGroup)
    <div class="attachment_group">
        @if (!empty($attachmentGroup->content->title))
            <h3>{{ $attachmentGroup->content->title }}</h3>
        @endif
        
        @php
        if (isset($attachmentGroup->content->blurb)) {
            echo '<div class="attachment_group_text">';
        	echo preg_replace('#<p>(\R|\s|[¬†])*</p>#', ' ', \App\Actions\CleanHtml::clean($attachmentGroup->content->blurb));
            echo '</div>';
        }
        @endphp

        @include('shared.resources.header')
        
        @foreach ($attachmentGroup->attachments as $attachment)
            @includeFirst(
                [
                    'shared.resources.row_'.$attachment->item->subtype, 
                    'shared.resources.row'
                ], [
                    'resource' => $attachment->item, 
                    'header_level' => '4'
                ]
            )
        @endforeach
             
    </div>
@endforeach
