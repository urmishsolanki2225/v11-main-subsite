const mix = require("laravel-mix");
/* 

  MIX config for compiling admin app, run with environment variable
MIX_FILE=webpack-admin.mix npm run dev

*/
require("laravel-mix-eslint");

mix.webpackConfig({
    target: "node",
})
    .setPublicPath("./")
    .ts("resources/js/convert.ts", "/storage/dev_tmp");
