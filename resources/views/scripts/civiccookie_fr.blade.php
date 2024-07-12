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

    title: 'Ce site utilise des cookies.',

    intro:  'Nous utilisons des cookies pour vous offrir la meilleure expérience de navigation sur notre site. En continuant, vous recevrez tous les cookies - cependant, les paramètres sont modifiables à tout moment.',

    necessaryTitle : 'Cookies nécessaires',

    necessaryDescription : 'Les cookies nécessaires permettent des fonctionnalités de base. Le site Web ne peut pas fonctionner correctement sans ces cookies et ne peut être désactivé qu\'en modifiant les préférences de votre navigateur.',

    notifyTitle : 'Votre choix concernant les cookies sur ce site',

    notifyDescription : 'Nous utilisons des cookies pour optimiser les fonctionnalités du site et vous offrir la meilleure expérience possible.',

    on : 'Sur',

    off : 'De',

    accept : 'Acceptez',

    acceptRecommended : 'Accepter les paramètres recommandés',						

    settings : 'Préférences de cookies',	

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

        description: 'Pour plus d\'informations vist notre',

        name : 'Déclaration de confidentialité',

        url: 'https://go.ei-ie.org/DataProtectionPolicy',

        updated : '21/04/2021'

    },      

};

CookieControl.load( config );

</script>
@endverbatim

@endif 
