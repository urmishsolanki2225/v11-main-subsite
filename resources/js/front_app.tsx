import React from "react";

import { createInertiaApp } from "@inertiajs/inertia-react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

createInertiaApp({
    resolve: (name) => {
        return resolvePageComponent(
            `./Front/${name}.tsx`,
            import.meta.glob("./Front/**/*.tsx")
        ).then((module) => {
            const page = (module as any).default;
            return page;
        });
    },

    // import(`./Front/${name}`).then(({ default: page }) => page),
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
