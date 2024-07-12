@if(config('eiie.civiccookie-api-key'))

@verbatim
    <script src="https://cc.cdn.civiccomputing.com/9/cookieControl-9.x.min.js" type="text/javascript"></script>
<script>


var config = {

    @endverbatim   
    apiKey: '{{ config("eiie.civiccookie-api-key") }}',
    @verbatim

   product: 'PRO_MULTISITE',    

   initialState: "NOTIFY",

   position: "LEFT",

   theme: "DARK",

   consentCookieExpiry: 90,     
   mode : "GDPR",
   notifyDismissButton : false,
   notifyOnce: false,
   settingsStyle: 'button', 

   text : {

       title: 'Education International uses website functionality and analytics cookies.',

       intro:  'We use cookies to ensure that we give you the best browsing experience on the EI website. By accepting the recommended settings, you are agreeing to accept both the functionality and analytics cookies described below. These settings are changeable at any time.',

       necessaryTitle : 'Necessary Functionality Cookies',

       necessaryDescription : 'Necessary cookies are required for the operation of our websites. These cookies can be disabled by changing your browser preferences, but doing so may disable some functionalities of our websites. Functionality cookies, such as this visitor consent cookie, are used to recognise visitors when they return to our websites.',

       notifyTitle : 'Your choice regarding cookies on this site',

       notifyDescription : 'We use cookies to optimise site functionality and give you the best possible experience.',

       on : 'On',

       off : 'Off',

       accept : 'Accept',

       acceptRecommended : 'Accept Recommended Settings',						

       settings : 'Cookie Preferences',	

   },		

     necessaryCookies: [ 'JSESSIONID','XSRF-TOKEN','laravel_session' ],                      

       optionalCookies: [

           {

               name: 'analytics',

               label: 'Analytical Cookies',

               description: 'Analytical cookies help us to improve our website by collecting and reporting information on its usage.',					

               cookies: ['_ga', '_ga*', '_gid', '_gat', '__utma', '__utmt', '__utmb', '__utmc', '__utmz', '__utmv', '__atuvc', '__atuvs'],

            onAccept: function(){
                gtag('consent', 'update', {'analytics_storage': 'granted'});
            },
            onRevoke: function(){
                gtag('consent', 'update', {'analytics_storage': 'denied'});
            },
              
               initialConsentState : 'on',

               thirdPartyCookies: [{"name": "AddThis", "optOutLink": "https://www.addthis.com/privacy/opt-out"}]

           },

       ],

       statement : {

           description: 'Please consult our',

           name : 'Data Protection Policy',

           url: 'https://www.ei-ie.org/en/contact/data-protection-policy',

           updated : '20/04/2021'

       },      

};

CookieControl.load( config );

</script>
@endverbatim

@endif 
