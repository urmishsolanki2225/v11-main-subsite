import React, { useLayoutEffect, useState } from "react";

import algoliasearch from "algoliasearch/lite";
import { createInsightsMiddleware } from "instantsearch.js/es/middlewares";
import { createRoot } from "react-dom/client";
import { useTranslation } from "react-i18next";
import {
    Configure,
    InstantSearch,
    useInstantSearch,
} from "react-instantsearch-hooks-web";
import aa from "search-insights";

import i18n from "../i18n";
import { Themed } from "../Themed";

import { FiltersAside } from "./FiltersAside";
import { Hits } from "./Hits";
import { Pagination } from "./Pagination";
import { SearchBox } from "./SearchBox";
import { Sort } from "./Sort";
import { Summary } from "./Summary";

interface IProps {
    language: string;
    translations: Record<string, string>;
    algolia: {
        appId: string;
        apiKey: string;
        indexName: string;         
    };
    //Added by Cyblance for Subsite section start
    regions?: string;
}
const SearchPage: React.FC<IProps> = ({ translations, algolia, language, regions }) => {
    //Added by Cyblance for Subsite section end
    const [searchClient] = useState(() =>
        algoliasearch(algolia.appId, algolia.apiKey)
    );

    i18n.changeLanguage(language);
    i18n.addResourceBundle(language, "translation", translations);
    const { t } = useTranslation();

    return (
        <Themed>
            <InstantSearch
                searchClient={searchClient}
                indexName={algolia.indexName}
                routing
            >
                <Configure
                    hitsPerPage={16}
                    attributesToSnippet={["content:50"]}
                    //Added by Cyblance for Subsite section strat
                    filters={regions != undefined ? `(lang:"${language}" OR lang:"*") AND (is_site:2 OR is_site:3) AND (regions.title: "${regions}")` : `(lang:"${language}" OR lang:"*") AND (is_site:1 OR is_site:3)`}
                    //Added by Cyblance for Subsite section end
                    clickAnalytics
                />
                <InsightsMiddleware />
                <div className="no_lead_image"></div>
                <article className="article_main collection_introduction">
                    <header>
                        <h2>{t`Search Education International`}</h2>
                        <SearchBox />
                        <Summary />
                        <Sort baseIndexName={algolia.indexName} />
                    </header>
                </article>
                <FiltersAside />
                <main>
                    <Hits />
                    <Pagination />
                </main>
            </InstantSearch>
        </Themed>
    );
};

const InsightsMiddleware = () => {
    const { use } = useInstantSearch();
    useLayoutEffect(() => {
        const middleware = createInsightsMiddleware({
            insightsClient: aa,
            insightsInitParams: {
                useCookie: true,
            },
        });
        return use(middleware);
    }, [use]);
    return <></>;
};

(window as any).renderSearchPage = (props: IProps) => {
    createRoot(document.getElementById("main_page")!).render(
        <SearchPage {...props} />
    );
};
