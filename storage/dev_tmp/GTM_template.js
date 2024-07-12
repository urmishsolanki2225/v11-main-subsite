// Enter your template code here.
const copyFromWindow = require("copyFromWindow");
const injectScript = require("injectScript");
const log = require("logToConsole");
const queryPermission = require("queryPermission");
const setDefaultConsentState = require("setDefaultConsentState");
const updateConsentState = require("updateConsentState");

log("data =", data);

// set default consent
setDefaultConsentState({
    ad_storage: data.marketing,
    analytics_storage: data.analytical,
});

var config = {
    apiKey: data.apiKey,
    product: data.product,
    mode: data.mode || "GDPR",
    notifyDissmissButton: false,
    initialState: "NOTIFY",
    position: "LEFT",
    theme: "DARK",
    consentCookieExpiry: 90,
    notifyDismissButton: false,
    notifyOnce: false,
    settingsStyle: "button",
    necessaryCookies: ["JSESSIONID", "XSRF-TOKEN", "laravel_session"],
    statement: {
        description: "Please consult our",
        name: "Data Protection Policy",
        url: "https://www.ei-ie.org/en/contact/data-protection-policy",
        updated: "20/04/2021",
    },
    text: {
        title: "Education International uses website functionality and analytics cookies.",
        intro: "We use cookies to ensure that we give you the best browsing experience on the EI website. By accepting the recommended settings, you are agreeing to accept both the functionality and analytics cookies described below. These settings are changeable at any time.",
        necessaryTitle: "Necessary Functionality Cookies",
        necessaryDescription:
            "Necessary cookies are required for the operation of our websites. These cookies can be disabled by changing your browser preferences, but doing so may disable some functionalities of our websites. Functionality cookies, such as this visitor consent cookie, are used to recognise visitors when they return to our websites.",
        notifyTitle: "Your choice regarding cookies on this site",
        notifyDescription:
            "We use cookies to optimise site functionality and give you the best possible experience.",
        on: "On",
        off: "Off",
        accept: "Accept",
        acceptRecommended: "Accept Recommended Settings",
        settings: "Cookie Preferences",
    },
    optionalCookies: [
        {
            name: "Analytics",
            label: "Analytical Cookies",
            description:
                "Analytical cookies help us to improve our website by collecting and reporting information on its usage.",
            onAccept: function () {
                updateConsentState({
                    analytics_storage: "granted",
                });
            },
            onRevoke: function () {
                updateConsentState({
                    analytics_storage: "denied",
                });
            },
            thirdPartyCookies: [
                {
                    name: "AddThis",
                    optOutLink: "https://www.addthis.com/privacy/opt-out",
                },
            ],
        },
        // {
        //     name: "marketing",
        //     label: "Marketing Cookies",
        //     description:
        //         "We use marketing cookies to help us improve the relevancy of advertising campaigns you receive.",
        //     onAccept: function () {
        //         updateConsentState({
        //             ad_storage: "granted",
        //         });
        //     },
        //     onRevoke: function () {
        //         updateConsentState({
        //             ad_storage: "denied",
        //         });
        //     },
        // },
    ],
    locales: [
        {
            locale: "en",
            text: {
                title: "Education International uses website functionality and analytics cookies.",
                intro: "We use cookies to ensure that we give you the best browsing experience on the EI website. By accepting the recommended settings, you are agreeing to accept both the functionality and analytics cookies described below. These settings are changeable at any time.",
                necessaryTitle: "Necessary Functionality Cookies",
                necessaryDescription:
                    "Necessary cookies are required for the operation of our websites. These cookies can be disabled by changing your browser preferences, but doing so may disable some functionalities of our websites. Functionality cookies, such as this visitor consent cookie, are used to recognise visitors when they return to our websites.",
                notifyTitle: "Your choice regarding cookies on this site",
                notifyDescription:
                    "We use cookies to optimise site functionality and give you the best possible experience.",
                on: "On",
                off: "Off",
                accept: "Accept",
                acceptRecommended: "Accept Recommended Settings",
                settings: "Cookie Preferences",
            },
            optionalCookies: [
                {
                    label: "Analytical Cookies",
                    description:
                        "Analytical cookies help us to improve our website by collecting and reporting information on its usage.",
                },
            ],
        },
        {
            locale: "es",
            text: {
                title: "Este sitio usa cookies.",
                intro: "Utilizamos cookies para asegurar que le ofrecemos la mejor experiencia de navegación en el sitio web de la IE. Al continuar, recibirá todas las cookies, pero la configuración puede ser cambiada en cualquier momento.",
                necessaryTitle: "Cookies necesarias",
                necessaryDescription:
                    "Las cookies necesarias habilitan la funcionalidad central. El sitio web no puede funcionar correctamente sin estas cookies, y solo se puede desactivar cambiando las preferencias de su navegador.",
                notifyTitle:
                    "Su elección con respecto a las cookies en este sitio",
                notifyDescription:
                    "Usamos cookies para optimizar la funcionalidad del sitio y brindarle la mejor experiencia posible.",
                on: "En",
                off: "Apagado",
                accept: "Aceptar",
                acceptRecommended: "Acepta la configuración recomendada",
                settings: "Preferencias de cookies",
            },
            optionalCookies: [
                {
                    label: "Analytical Cookies",
                    description:
                        "Analytical cookies help us to improve our website by collecting and reporting information on its usage.",
                },
            ],
            statement: {
                description: "Para más información visite nuestra",
                name: "Política de Protección de Datos",
                url: "https://www.ei-ie.org/es/contact/data-protection-policy",
                updated: "21/04/2021",
            },
        },
        {
            locale: "fr",
            text: {
                title: "Ce site utilise des cookies.",
                intro: "Nous utilisons des cookies pour vous offrir la meilleure expérience de navigation sur notre site. En continuant, vous recevrez tous les cookies - cependant, les paramètres sont modifiables à tout moment.",
                necessaryTitle: "Cookies nécessaires",
                necessaryDescription:
                    "Les cookies nécessaires permettent des fonctionnalités de base. Le site Web ne peut pas fonctionner correctement sans ces cookies et ne peut être désactivé qu'en modifiant les préférences de votre navigateur.",
                notifyTitle: "Votre choix concernant les cookies sur ce site",
                notifyDescription:
                    "Nous utilisons des cookies pour optimiser les fonctionnalités du site et vous offrir la meilleure expérience possible.",
                on: "Sur",
                off: "De",
                accept: "Acceptez",
                acceptRecommended: "Accepter les paramètres recommandés",
                settings: "Préférences de cookies",
            },
            optionalCookies: [
                {
                    label: "Analytical Cookies",
                    description:
                        "Analytical cookies help us to improve our website by collecting and reporting information on its usage.",
                },
            ],
            statement: {
                description: "Pour plus d'informations vist notre",
                name: "Politique de protection des données",
                url: "https://www.ei-ie.org/fr/contact/data-protection-policy",
                updated: "21/04/2021",
            },
        },
    ],
};

const onSuccess = () => {
    log("onSuccess");
    const CookieControl = copyFromWindow("CookieControl");
    const cookieControlLocale = copyFromWindow("cookieControlLocale");
    log(cookieControlLocale);
    const mergedConfig = config;
    mergedConfig.locale = cookieControlLocale;
    log(mergedConfig);
    CookieControl.load(mergedConfig);
    data.gtmOnSuccess();
};

const onFailure = () => {
    log("fail");
    data.gtmOnFailure();
};

injectScript(
    "https://cc.cdn.civiccomputing.com/9/cookieControl-9.x.min.js",
    onSuccess,
    onFailure
);

log("end", config);
// Call data.gtmOnSuccess when the tag is finished.
// data.gtmOnSuccess();
