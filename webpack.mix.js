const mix = require("laravel-mix");
require("laravel-mix-bundle-analyzer");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

/* @Thorben: you can comment out the .ts rule for faster compiling */
/* Comment out by appending // in front */

// mix.webpackConfig({
//     resolve: {
//         symlinks: false,
//     },
// });

const babelConfig = {
    plugins: [
        [
            "babel-plugin-import",
            {
                libraryName: "@mui/material",
                // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                libraryDirectory: "esm",
                camel2DashComponentName: false,
            },
            "core",
        ],
        [
            "babel-plugin-import",
            {
                libraryName: "@mui/icons-material",
                // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                libraryDirectory: "esm",
                camel2DashComponentName: false,
            },
            "icons",
        ],
    ],
};

// mix.bundleAnalyzer();
mix.babelConfig(babelConfig);

mix.sass("resources/sass/style.scss", "public/css").version();
mix.ts(
    [
        "resources/js/app.tsx",
        "resources/js/Pages/Home.tsx",
        "resources/js/Pages/Login/Login.tsx",
        "resources/js/Pages/Items/List.tsx",
        "resources/js/Pages/Items/Edit.tsx",
        "resources/js/Pages/Items/Create.tsx",
        "resources/js/Pages/Collections/List.tsx",
        "resources/js/Pages/Collections/Edit.tsx",
        "resources/js/Pages/Collections/Create.tsx",
        "resources/js/Pages/GeoData/Import.tsx",
        "resources/js/Pages/GeoData/SetList.tsx",
        "resources/js/Pages/GeoData/MapCreate.tsx",
        "resources/js/Pages/GeoData/MapList.tsx",
    ],
    "public/js"
).version();

mix.ts("./resources/js/front_app.tsx", "public/js/front_app.js").version();
mix.ts(
    "./resources/js/Front/CoopProject/SearchForm.tsx",
    "public/js/coop_project_search_form.js"
).version();
mix.ts(
    "./resources/js/Front/CoopProject/Map.tsx",
    "public/js/coop_project_map.js"
).version();
mix.ts(
    "./resources/js/Front/Newsletter/NewsletterSubscribeForm.tsx",
    "./public/js/newsletter_subscribe_form.js"
).version();
mix.ts(
    "./resources/js/Front/Search/SearchPage.tsx",
    "public/js/search_page.js"
).version();
mix.ts(
    [
        "./resources/js/Front/Map/Map.tsx",
        "./resources/js/Front/Map/SolidarityMap.tsx",
        "./resources/js/Front/Map/CollectionItemCountMap.tsx",
        "./resources/js/Front/Map/GeoDataMap.tsx",
    ],
    "public/js/map.js"
);

mix.extract(["jquery"], "js/vendor-jq.js");
mix.extract(
    [
        // "@mui/material",
        // "@mui/icons-material",
        // "@mui/styled-engine",
        // "@mui/base",
        // "@mui/system",
        "@emotion",
        "@mui",
        "react",
        "react-dom",
        "ziggy-js",
        "@date-io",
        "dayjs",
        "@inertiajs",
        "@popperjs",
        // "mui-tel-input",
    ],
    "js/vendor-mui.js"
);

mix.js("resources/js/script.js", "public/js").version();
