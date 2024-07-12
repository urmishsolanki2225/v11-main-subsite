import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        base: '/v11-main/public/build/',
        plugins: [
            react(),
            laravel([
                "resources/sass/style.scss",
                //Added by Cyblance for Annual-Reports section start
                "resources/sass/highlight.scss",
                "resources/sass/aos.scss",
                //Added by Cyblance for Annual-Reports section end
                "resources/js/script.js",
                "resources/js/app.tsx",
                "resources/js/front_app.tsx",
                "resources/js/Front/CoopProject/SearchForm.tsx",
                "resources/js/Front/CoopProject/Map.tsx",
                "resources/js/Front/Newsletter/NewsletterSubscribeForm.tsx",
                "resources/js/Front/Search/SearchPage.tsx",
                "resources/js/Front/Map/CollectionItemCountMap.tsx",
                "resources/js/Front/Map/GeoDataMap.tsx",
                "resources/js/Front/Map/SolidarityMap.tsx",
            ]),
            NodeGlobalsPolyfillPlugin({
                process: true,
                buffer: true,
            }),
        ],
        optimizeDeps: {
            esbuildOptions: {
                // Node.js global to browser globalThis
                define: {
                    global: "globalThis",
                },
                // Enable esbuild polyfill plugins
                plugins: [
                    NodeGlobalsPolyfillPlugin({
                        process: true,
                        buffer: true,
                    }),
                ],
            },
        },
        server: {
            hmr: {
                host: env.HMR_HOST,
                clientPort: env.HMR_CLIENTPORT,
                protocol: env.HMR_PROTOCOL,
            },
        },
        build: {
            rollupOptions: {
                plugins: [rollupNodePolyFill()],
            },
        },
    };
});
