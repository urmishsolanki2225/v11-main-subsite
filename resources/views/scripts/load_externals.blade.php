@php 
    $locale = \App::getLocale();
@endphp 

{{--
@includeFirst([
    'scripts.civiccookie_'.$locale,
    'scripts.civiccookie_en',
])
--}}

@verbatim
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "a6kfnk98x5");
</script>
@endverbatim

