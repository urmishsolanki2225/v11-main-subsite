<?php 

namespace App\Actions;

use App\Models\Model;
use App\Models\ResourceFile;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\Concerns\InteractsWithPivotTable;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

class Patch {

    // patching according to JSON diff delta format
    // https://github.com/benjamine/jsondiffpatch/blob/master/docs/deltas.md

    public function execute(Model $model, array $deltas) {
        if (!isset($deltas) || !count($deltas)) {
            return;
        }
        $this->patchObject($model, $deltas);
    }

    protected function patchObject(Model $model, $deltas) {
        foreach ($deltas as $property => $delta) {
            if (isset($delta['_t']) && $delta['_t'] == 'a') {
                // array
                $this->patchArray($model, $property, $delta);
            } else if ($property === 'meta') {
                // meta is always transmitted 'raw'
                $model->meta = $delta;
            } else if (Arr::isAssoc($delta)) {
                $this->patchObject($model->{Str::camel($property)}, $delta);
            } else {
                $this->patchProperty($model, $property, $delta);
            }
        }
        if (isset($model->title) && (!isset($model->slug) || !$model->slug)) {
            // $model->slug = Str::slug($model->title);
        } 
        if ($model->timestamps) {
            $model->touch();
        }
        $model->push();
    }

    protected function patchProperty(Model $model, $property, $delta) {
        // echo '<hr />';
        // echo 'patchProperty '.$property.' :: ';
        // $newValue;
        if (count($delta) == 1) {
            // Added
            $newValue = $delta[0];
        } else if (count($delta) == 2) {
            // Modified
            $newValue = $delta[1];
        } else if (count($delta) == 3 && $delta[2] == 0) {
            // Deleted
            $newValue = null;
        } else {
            echo 'Unhandled delta for: '.$property;
            print_r($delta);
            die();
        }
        
        $model->{$property} = $newValue;        
    }

    protected function patchRelation(Model $model, $delta) {
        foreach ($delta as $relation => $deltas) {
            $this->patchObject($model, $relation, $deltas);
        }
    }

    protected function patchArray(Model $model, $relation, array $deltas) {
        $relation = str_replace('_', '', lcfirst(ucwords($relation, '_')));
        // split up the actions
        // also check whether all array objects have an id
        $existing = $model->{$relation}()
                        ->withoutGlobalScopes()
                        ->get()
                        ->pluck('id')
                        ->all();
        $hasPivot = in_array(
                        'Illuminate\Database\Eloquent\Relations\Concerns\InteractsWithPivotTable', 
                        class_uses($model->{$relation}()::class)
                    );
        $toRemove = [];
        $toInsert = [];
        $toUpdate = [];
        foreach ($deltas as $key => $delta) {
            if ($key == '_t') {
                continue;
            }
            if (substr($key, 0, 1) == '_') {
                // remove from _key 
                if ($delta[2] == 0 || $delta[2] == 3) {
                    // 0 = delete
                    // 3 = move
                    $toRemove[substr($key, 1)] = $delta;
                } else {
                    // shouldn't happen
                    echo '<br /> Invalid patch delta ';
                    print_r($delta);
                    die();
                }
            } else if (count($delta) == 1 && isset($delta[0])) {
                // new item
                $toInsert[$key] = $delta[0];
            } else {
                // modify
                $toUpdate[$key] = $delta;
            }
        }
        krsort($toRemove, SORT_NUMERIC);
        foreach ($toRemove as $idx => $delta) {
            $removed = array_splice($existing, $idx, 1)[0];
            if ($delta[2] == 3) {
                // move, so insert it again
                $toInsert[$delta[1]] = $removed;
            } else {
                // remove from relation
                if ($hasPivot) {
                    // this will be synced, after inserts
                    // $model->{$relation}()->detach($removed);
                } else {
                    // $model->{$relation}()->find($removed)->dissociate();
                    // not a pivot, so we have to dissociate the related model
                    // var_dump($model->getForeignKey());
                    $model->{$relation}()               // relation
                        ->withoutGlobalScopes()
                        ->find($removed)                // related model
                        ->delete();         // is this always the case ??
                        // ->update([$model->getForeignKey() => null]);
                        // ->{$model->getForeignKey()}()   // inverse relation (belongsTo)
                        // ->dissociate()
                        // ;
                }
            }
        }
        ksort($toInsert, SORT_NUMERIC);
        foreach ($toInsert as $idx => $obj) {
            if (isset($obj['id']) && $obj['id']) {
                // id present, implies related model exists
                // we just need to save it to this relation
                // there will be no deeper (???)
                array_splice($existing, $idx, 0, $obj['id']);
            } else if (is_array($obj)) {
                // create it
                // the $relation is the relation name so we use create([])
                // but first we need to check whether there are sub-relations
                $created = $this->createRelated($model, $relation, $obj);
                if (!empty($created)) {
                    array_splice($existing, $idx, 0, $created->id); 
                }
            } else {
            	array_splice($existing, $idx, 0, $obj);
            }
        }
        foreach ($toUpdate as $idx => $deltas) {
            // update in array patch is always a relation
            $related = $model->{$relation}()
                             ->withoutGlobalScopes()
                             ->find($existing[$idx]);
            if (!$related) {
                echo "<br /> no related model? $relation id: $existing[$idx] ";
                die();
            }
            $this->patchObject($related, $deltas);
        }
        // sync
        if ($hasPivot) {
            // echo "\nMaking reorder keys ";
            $pivotColumns = $model->{$relation}()->getPivotColumns();
            $syncUpdate = $existing;
            if (count($pivotColumns)) {
                $ordered = [];
                $order = 0;
                $orderColumn = $pivotColumns[0];
                foreach ($existing as $id) {
                    $ordered[$id] = [$orderColumn => $order++];
                }
                $syncUpdate = $ordered;
            }
            $model->{$relation}()->withoutGlobalScopes()->sync($syncUpdate);
        } else {
            // echo 'not hasPivot?';
            if ($relation == 'files') {
                // this is the only situation with ordering without a pivot
                // some trouble with default, so let's do it dumb...
                foreach ($existing as $order => $id) {
                    ResourceFile::where('id', $id)->update(['order' => $order]);
                }
            }
        }
    }  

    protected function createRelated(Model $model, $relation, $deltas) {
        // the $property is the relation name so we use create([])
        // but first we need to check whether there are sub-relations
        if (!$model->isRelation($relation)) {
            Log::debug('Not a relation '.$relation);
            return [];
        }
        $hasPivot = in_array(
            InteractsWithPivotTable::class, 
            class_uses($model->{$relation}()::class)
        );
        $order = 0;        
        if (isset($deltas[0])) {
            // multiple items
            $createdRelations = [];
            foreach ($deltas as $obj) {
                if ($hasPivot) {
                    $pivotColumns = $model->{$relation}()->getPivotColumns();
                    if (count($pivotColumns)) {
                        $orderColumn = $pivotColumns[0];
                        $obj[$orderColumn] = $order++;
                    }
                }
                $created = $this->createRelated($model, $relation, $obj);
                if (!empty($created)) {
                    $createdRelations[] = $created;
                }
            }
            return $createdRelations;
        }
        $create = [];
        $subRelations = [];
        foreach ($deltas as $property => $delta) {
            if (is_array($delta)) {
                if (!count($delta)) {
                    continue; // the foreach loop
                }
                if ($hasPivot) {
                    // property will be attached later
                    $subRelations[$property] = $delta;
                } else if (isset($delta['id']) && $delta['id']) {
                    // for the belongsTo relation
                    $create[$property.'_id'] = $delta['id'];
                } else {
                    // create it afterwards ??
                    $subRelations[$property] = $delta;
                }
            // } else if ($model->{$relation}()->isRelation($property))  {
            //     $subRelations[$property] = $delta;
            } else if ($property === 'dev_coop_project') {
                if (!empty($delta)) {
                    $subRelations['devCoopProject'] = $delta;
                }
            } else {
                // ToDo this is a bit buggy...
                $create[$property] = ($property != 'meta' && $property != 'checked_at' && $delta === null) ? '' : $delta;
            }
        }
        if (isset($create['title']) && (!isset($create['slug']) || !$create['slug'])) {
            // $create['slug'] = Str::slug($create['title']);
        }
        if ($hasPivot) {
            // echo "\nMaking reorder keys ";
            $pivotColumns = $model->{$relation}()->getPivotColumns();
            if (count($pivotColumns)) {
                $orderColumn = $pivotColumns[0];
                $create[$orderColumn] = 0;
            }
        }
        $createdRelation = $model->{$relation}()->create($create);
        foreach ($subRelations as $subRelation => $delta) {
            if (isset($delta['id']) && $delta['id']) {
                // existing item, attach it
                $createdRelation->{$subRelation}->attach($delta['id']);
            } else {
                // create new related object, may be multiple
                $this->createRelated($createdRelation, $subRelation, $delta);
            }
        }
        return $createdRelation;
    }

    protected function createOrAttach($model, $relation, $obj) {

    }

}
