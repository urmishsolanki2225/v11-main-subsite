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

    title: 'Este sitio usa cookies.',

    intro:  'Utilizamos cookies para asegurar que le ofrecemos la mejor experiencia de navegación en el sitio web de la IE. Al continuar, recibirá todas las cookies, pero la configuración puede ser cambiada en cualquier momento.',

    necessaryTitle : 'Cookies necesarias',

    necessaryDescription : 'Las cookies necesarias habilitan la funcionalidad central. El sitio web no puede funcionar correctamente sin estas cookies, y solo se puede desactivar cambiando las preferencias de su navegador.',

    notifyTitle : 'Su elección con respecto a las cookies en este sitio',

    notifyDescription : 'Usamos cookies para optimizar la funcionalidad del sitio y brindarle la mejor experiencia posible.',

    on : 'En',

    off : 'Apagado',

    accept : 'Aceptar',

    acceptRecommended : 'Acepta la configuración recomendada',						

    settings : 'Preferencias de cookies',	

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

        description: 'Para más información visite nuestra',

        name : 'Declaracion de privacidad',

        url: 'https://go.ei-ie.org/DataProtectionPolicy',

        updated : '21/04/2021'

    },      

};

CookieControl.load( config );

</script>
@endverbatim

@endif 
