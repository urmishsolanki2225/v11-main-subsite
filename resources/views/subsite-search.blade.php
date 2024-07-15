@extends('subsite-main')

@section('title', __('eiie.Education International'))

@section('head')
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css" integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8=" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/algoliasearch@4.5.1/dist/algoliasearch-lite.umd.js" integrity="sha256-EXPXz4W6pQgfYY3yTpnDa3OH8/EPn16ciVsPQ/ypsjk=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/instantsearch.js@4.8.3/dist/instantsearch.production.min.js" integrity="sha256-LAGhRRdtVoD6RLo2qDQsU2mp+XVSciKRC8XPOBWmofM=" crossorigin="anonymous"></script>
    <script>
      var ALGOLIA_INSIGHTS_SRC = "https://cdn.jsdelivr.net/npm/search-insights@1.8.0";

      !function(e,a,t,n,s,i,c){e.AlgoliaAnalyticsObject=s,e[s]=e[s]||function(){
      (e[s].queue=e[s].queue||[]).push(arguments)},i=a.createElement(t),c=a.getElementsByTagName(t)[0],
      i.async=1,i.src=n,c.parentNode.insertBefore(i,c)
      }(window,document,"script",ALGOLIA_INSIGHTS_SRC,"aa");

    </script>
@endsection

@section('content')
<div class="no_lead_image"></div>

<article class="article_main collection_introduction">
    <header><h2>{{ __('eiie.Search') }}</h2></header>
</article>

<main class="main_searchresults">
    <div id="searchbox"></div>
    <div id="hits"></div>
    <div id="pagination"></div>
</main>

<script>

var searchClient = algoliasearch(
        '{{ config('scout.algolia.id') }}',
        '{{ Algolia\ScoutExtended\Facades\Algolia::searchKey(App\Models\ItemContent::class) }}',
      );
window.aa('init', {
    appId: '{{ config('scout.algolia.id') }}',
    apiKey: '{{ Algolia\ScoutExtended\Facades\Algolia::searchKey(App\Models\ItemContent::class) }}',
});
var readMoreStr = '{{ __('eiie.Read more') }}';
var curLang = '{{ \App::getLocale() ?? '' }}';

var search = instantsearch({
  indexName: 'item_contents_cybl',
  searchClient,
  searchParameters: {
    clickAnalytics: true,
  },
  initialUiState: {
    item_contents_cybl: {
      query: '{{ request()->query("keyword") }}'
    }
  }
});

var insightsMiddleware = instantsearch.middlewares.createInsightsMiddleware({
  insightsClient: window.aa,
});

search.use(insightsMiddleware);

search.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 16,
    attributesToSnippet: ['content:50'],
    filters: '(lang:' + curLang + ' OR lang:"*")'
  }),

  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),

  @verbatim
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item(hit, bindEvent) {
        var lang = hit.lang === '*' ? curLang : hit.lang ;
        var link = '/' + lang
                    + '/item/'
                    + hit.item_id + ':' + (hit.slug || '_')
                    ;
        var collections = hit.collections
          ? hit.collections.map(function(coll) {
              return '<span>' + coll + '</span>'
            })
          : ''
          ;

        return '<article><header><h3><a href="' + link + '">'
          + instantsearch.highlight({
                attribute: 'title',
                highlightedTagName: 'mark',
                hit: hit
            })
          + '</a></h3><span class="date">'
            + (hit.publish_at || hit.created_at)
          + '</span> <span class="first-collections">'
            + collections
          + '</span>'
          + '</header><p>'
            + instantsearch.snippet({
                  attribute: 'content',
                  highlightedTagName: 'mark',
                  hit: hit
              })
          + '</p><a href="' + link + '" ' + bindEvent("click", hit, "clickedObjectIDsAfterSearch") + ' ">'
            + readMoreStr
          + '</a></article>'
          ;
      }
    }
  }),
  @endverbatim

  instantsearch.widgets.pagination({
    container: '#pagination',
  }),

]);

search.start();

</script>

@endsection