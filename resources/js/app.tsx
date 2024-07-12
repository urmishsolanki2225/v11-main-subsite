import React from "react";

import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

import { AdminLayout } from "./Layout";
import Themed from "./Layout/Themed";

InertiaProgress.init();

createInertiaApp({
    resolve: (name) => {
        return resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob<any>("./Pages/**/*.tsx")
        ).then(({ default: page }) => {
            if (page.layout === undefined) {
                if (name.startsWith("Login")) {
                    page.layout = (page: any) => <Themed>{page}</Themed>;
                } else {
                    page.layout = (page: any) => (
                        <Themed>
                            <AdminLayout>{page}</AdminLayout>
                        </Themed>
                    );
                }
            }
            return page;
        });
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
