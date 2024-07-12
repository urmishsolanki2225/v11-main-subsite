<?php
use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;
use App\Models\Collection;

if (\Request::segment(1) != "clear-cache" && Request::segment(1) != "") {
    $name = (\Request::route()->getName());
}
if (isset($name)) {
    if ($name == 'subsite.home') {
        Breadcrumbs::for($name, function ($trail) {
            $trail->push('', route('subsite.home'));
        });
    } elseif ($name == 'subsite.news') {
        Breadcrumbs::for($name, function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.News'), route('subsite.news'));
        });
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
    } elseif ($name == 'subsite.who-we-are') {
        Breadcrumbs::for($name, function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.Who we are'), route('subsite.who-we-are'));
        });
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
    } elseif ($name == 'subsite.resources.videos') {
        Breadcrumbs::for($name, function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.Videos'), route('subsite.resources.videos'));
        });
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
        //Added By Cyblance For Project Start
    } elseif ($name == 'subsite.region') {
        Breadcrumbs::for($name, function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.Region'), route('subsite.region', ['id']));
        });
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });

    } elseif ($name == 'subsite.country') {
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
        Breadcrumbs::for('region', function ($trail) {
            $current_params = Route::current()->parameters();
            $query = Collection::with('content')->where('id', $current_params['id'])->where('status', 'published')->first();
            $trail->parent('home');
            $trail->push($query->parentCollections[0]->content->title, route('subsite.region', [$query->parentCollections[0]->content->collection_id, $query->parentCollections[0]->content->slug]));
        });
        Breadcrumbs::for($name, function ($trail, $item) {
            $trail->parent('region');
            if (isset ($item->content->title)) {
                $trail->push($item->content->title, route('subsite.country', ['id']));
            } else {
                $trail->push('', route('subsite.country', ['id']));
            }
        });
    } elseif ($name == 'subsite.country.articles') {
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
        Breadcrumbs::for('region', function ($trail) {
            $current_params = Route::current()->parameters();
            $query = Collection::with('content')->where('id', $current_params['id'])->where('status', 'published')->first();
            $trail->parent('home');
            if (isset ($query->content->title)) {
                $trail->push($query->parentCollections[0]->content->title, route('subsite.region', [$query->parentCollections[0]->content->collection_id, $query->parentCollections[0]->content->slug]));
            } else {
                $trail->push('', route('subsite.region', [$query->parentCollections[0]->content->collection_id, $query->parentCollections[0]->content->slug]));
            }
        });
        Breadcrumbs::for('country', function ($trail) {
            $current_params = Route::current()->parameters();
            $query = Collection::with('content')->where('id', $current_params['id'])->where('status', 'published')->first();
            $trail->parent('region');
            if (isset ($query->content->title)) {
                $trail->push($query->content->title, route('subsite.country', [$query->content->collection_id, $query->content->slug]));
            } else {
                $trail->push($query->content->title, route('', [$query->content->collection_id, $query->content->slug]));
            }
        });
        Breadcrumbs::for($name, function ($trail, $item) {
            $trail->parent('country');
            $trail->push(trans('eiie.Articles'), route('subsite.country', [$item->content->collection_id, $item->content->slug]));
        });
    } elseif ($name == 'subsite.opinion') {
        Breadcrumbs::for($name, function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.Worlds of Education'), route('subsite.opinion'));
        });
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
    } elseif ($name == 'subsite.statements') {
        Breadcrumbs::for($name, function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.Statements'), route('subsite.statements'));
        });
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
    } elseif ($name == 'subsite.take-action') {
        Breadcrumbs::for($name, function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.Take action!'), route('subsite.take-action'));
        });
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
    } elseif ($name == 'subsite.item.show') {
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
        Breadcrumbs::for('news', function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.News'), route('subsite.news'));
        });
        Breadcrumbs::for('opinion', function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.Worlds of Education'), route('subsite.opinion'));
        });
        Breadcrumbs::for('statements', function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.Statements'), route('subsite.statements'));
        });
        Breadcrumbs::for('take-action', function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.Take action!'), route('subsite.take-action'));
        });
        Breadcrumbs::for($name, function ($trail, $item) {
            if ($item->collections->find(1)) {
                $trail->parent('news');
            } else if ($item->collections->find(7)) {
                $trail->parent('opinion');
            } else if ($item->collections->find(11)) {
                $trail->parent('statements');
            } else if ($item->collections->find(3)) {
                $trail->parent('take-action');
            } else {
                $trail->parent('news');
            }
            if (isset ($item->content->title)) {
                $trail->push($item->content->title, route('subsite.news'));
            } else {
                $trail->push('', route('subsite.news'));
            }
        });
    } elseif ($name == 'subsite.affiliates') {
        Breadcrumbs::for($name, function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.Affiliates'), route('subsite.affiliates'));
        });
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
    } elseif ($name == 'subsite.governance') {
        Breadcrumbs::for($name, function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.Governance'), route('subsite.governance'));
        });
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
    } elseif ($name == 'subsite.governance.constitution-and-bylaws') {
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
        Breadcrumbs::for('governance', function ($trail) {
            $trail->parent('home');
            $trail->push('Governance', route('subsite.governance'));
        });
        Breadcrumbs::for($name, function ($trail) {
            $trail->parent('governance');
            $trail->push('Contitutional Document', route('subsite.governance.constitution-and-bylaws'));
        });
    } elseif ($name == 'subsite.governance.world-congress') {
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
        Breadcrumbs::for('governance', function ($trail) {
            $trail->parent('home');
            $trail->push('Governance', route('subsite.governance'));
        });
        Breadcrumbs::for($name, function ($trail) {
            $trail->parent('governance');
            $trail->push('World Congress', route('subsite.governance.world-congress'));
        });
    } elseif ($name == 'subsite.governance.annual-reports') {
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
        Breadcrumbs::for('governance', function ($trail) {
            $trail->parent('home');
            $trail->push('Governance', route('subsite.governance'));
        });
        Breadcrumbs::for($name, function ($trail) {
            $trail->parent('governance');
            $trail->push('Annual Reports', route('subsite.governance.annual-reports'));
        });
    } elseif ($name == 'subsite.contact') {
        Breadcrumbs::for($name, function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.Contact Us'), route('subsite.contact'));
        });
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
    } elseif ($name == 'subsite.campaigns') {
        Breadcrumbs::for($name, function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.Campaigns'), route('subsite.campaigns'));
        });
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
    } elseif ($name == 'subsite.dossier') {
        $current_params = Route::current()->parameters();
        $query = Collection::with('content')->where('id', $current_params['id'])->where('status', 'published')->first();
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });

        Breadcrumbs::for('campaigns', function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.Campaigns'), route('subsite.campaigns'));
        });
        Breadcrumbs::for($name, function ($trail) {
            $current_params = Route::current()->parameters();
            $query = Collection::with('content')->where('id', $current_params['id'])->where('status', 'published')->first();
            $trail->parent('campaigns');
            if (isset ($query->content->title)) {
                $trail->push($query->content->title, route('subsite.campaigns'));
            } else {
                $trail->push('', route('subsite.campaigns'));
            }
        });
    } elseif ($name == 'subsite.dossier.sub') {
        $current_params = Route::current()->parameters();
        $query = Collection::with('content')->where('id', $current_params['id'])->where('status', 'published')->first();
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
        Breadcrumbs::for('campaigns', function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.Campaigns'), route('subsite.campaigns'));
        });
        Breadcrumbs::for(lcfirst($query->parentCollections[0]->content->title), function ($trail) {
            $current_params = Route::current()->parameters();
            $query = Collection::with('content')->where('id', $current_params['id'])->where('status', 'published')->first();
            $trail->parent('campaigns');
            $trail->push($query->parentCollections[0]->content->title, route('subsite.dossier', [$query->parentCollections[0]->content->collection_id, $query->parentCollections[0]->content->slug]));
        });
        Breadcrumbs::for($name, function ($trail) {
            $current_params = Route::current()->parameters();
            $query = Collection::with('content')->where('id', $current_params['id'])->where('status', 'published')->first();
            $trail->parent(lcfirst($query->parentCollections[0]->content->title));
            if (isset ($query->content->title)) {
                $trail->push($query->content->title, route('subsite.dossier', ['id']));
            } else {
                $trail->push('', route('dossier', ['id']));
            }
        });
    } elseif ($name == 'subsite.resources.publications') {
        Breadcrumbs::for($name, function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.Publications'), route('subsite.resources.publications'));
        });
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
    } elseif ($name == 'subsite.resources.research') {
        Breadcrumbs::for($name, function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.Research'), route('subsite.resources.research'));
        });
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
    } elseif ($name == 'subsite.newsletter') {
        Breadcrumbs::for($name, function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.Subscribe to Our Newsletters'), route('subsite.newsletter'));
        });
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
    } elseif ($name == 'data-protection-policy') {
        Breadcrumbs::for($name, function ($trail) {
            $trail->parent('home');
            $trail->push(trans('eiie.Data Protection Policy'), route('data-protection-policy'));
        });
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
    } elseif ($name == 'subsite.collection'){
        Breadcrumbs::for($name, function ($trail, $id, $slug = null) {
            $trail->parent('home');
            $trail->push(trans('eiie.group_dossier'), route('subsite.collection', [$id, $slug]));
        });
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
    } elseif ($name == 'subsite.legal-notice'){
        Breadcrumbs::for($name, function ($trail, $id, $slug = null) {
            $trail->parent('home');
            $trail->push(trans('eiie.Legal Notice'), route('subsite.legal-notice', [$id, $slug]));
        });
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
    } elseif ($name == 'subsite.data-protection-policy'){
        Breadcrumbs::for($name, function ($trail, $id, $slug = null) {
            $trail->parent('home');
            $trail->push(trans('eiie.Data Protection Policy'), route('subsite.data-protection-policy', [$id, $slug]));
        });
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
    } elseif ($name == 'subsite.resources.world-congress-resolutions'){
        Breadcrumbs::for($name, function ($trail, $id, $slug = null) {
            $trail->parent('home');
            $trail->push(trans('eiie.World Congress resolutions'), route('subsite.resources.world-congress-resolutions', [$id, $slug]));
        });
        Breadcrumbs::for('home', function ($trail) {
            $trail->push(trans('eiie.Home'), route('subsite.home'));
        });
    }
}