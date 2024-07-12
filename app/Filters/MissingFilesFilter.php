<?php 

namespace App\Filters;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class MissingFilesFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->where('subtype', 'file')
            ->whereHas('contents', fn($q) => $q->doesntHave('files'))
            ;
            // (fn($q) => $q->whereHas(
            //                     'contents.files', 
            //                     fn($q) => $q->whereNull('original_filename')
            //         )
            //         ->orWhereDoesntHave('(
                
            // )
        // );
    }
}
