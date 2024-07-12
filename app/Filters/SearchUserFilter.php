<?php 
namespace App\Filters;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class SearchUserFilter implements Filter{

    public function __invoke(Builder $query, $value, string $property){
        return $query->where('name', 'like', "%$value%")
                ->orWhere('id', '=', $value)
                ->orWhere('role', 'like', "%$value%")
                ->orWhere('email', 'like', "%$value%");
    }
}
