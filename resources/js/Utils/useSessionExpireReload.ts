import { useEffect } from "react";

import { Inertia, Page } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";

import { SessionPageProps } from "../Models";

const useSessionExpireReload = () => {
    const page = usePage<Page<SessionPageProps>>();

    useEffect(() => {
        if (!page.props.session_lifetime) {
            return;
        }
        const timer = setTimeout(() => {
            Inertia.reload();
        }, page.props.session_lifetime * 60 * 1000 + 2000);

        return () => clearTimeout(timer);
    }, [page]);

    return page.props.session_lifetime * 60;
};

export default useSessionExpireReload;
