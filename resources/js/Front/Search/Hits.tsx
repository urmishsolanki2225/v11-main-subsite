import React, { Fragment, useMemo } from "react";

import { useTranslation } from "react-i18next";
import {
    Highlight,
    Snippet,
    useCurrentRefinements,
    useHits,
} from "react-instantsearch-hooks-web";

interface EiieContentHit extends Record<string, any> {
    title: string;
    slug: string;
    publish_at: string;
    item_id: number;
    blurb: string;
    countries: { id: number; title: string }[];
    authors: { id: number; title: string }[];
    collections: string[];
    categories: string[]; // search categories
}

export const Hits: React.FC = () => {
    const { t } = useTranslation();
    const { hits, sendEvent, results } = useHits<EiieContentHit>();
    const { items: facets } = useCurrentRefinements();

    const activeFacets = useMemo(() => {
        return {
            categories:
                facets
                    .find(({ attribute }) => attribute === "categories")
                    ?.refinements.map(({ value }) => value) || [],
            countries:
                facets
                    .find(({ attribute }) => attribute === "countries.title")
                    ?.refinements.map(({ value }) => value) || [],
            authors:
                facets
                    .find(({ attribute }) => attribute === "authors.title")
                    ?.refinements.map(({ value }) => value) || [],
        };
    }, [facets]);

    return hits.length > 0 ? (
        <ol>
            {hits.map((hit) => (
                <li key={hit.objectID}>
                    <article>
                        <header>
                            <span className="date">{hit.publish_at}</span>
                            <h3>
                                <Highlight
                                    hit={hit}
                                    attribute="title"
                                    highlightedTagName="mark"
                                />
                            </h3>
                        </header>
                        <p>
                            <Snippet
                                hit={hit}
                                attribute="content"
                                highlightedTagName="mark"
                            />
                        </p>
                        {hit.collections.length > 0 && false && (
                            <span className="first_collections">
                                {hit.collections.map((collection, idx) => (
                                    <Fragment key={idx}>
                                        {idx > 0 && ", "}
                                        <span>{collection}</span>
                                    </Fragment>
                                ))}
                            </span>
                        )}
                        {hit.categories.length > 0 && (
                            <span className="search_categories">
                                {hit.categories.map((category, idx) => (
                                    <Fragment key={category}>
                                        {idx > 0 && ", "}
                                        <span
                                            className={
                                                activeFacets.categories.includes(
                                                    category
                                                )
                                                    ? "filter_active"
                                                    : undefined
                                            }
                                        >
                                            {category}
                                        </span>{" "}
                                    </Fragment>
                                ))}
                            </span>
                        )}
                        {hit.authors.length > 0 && (
                            <span className="search_authors">
                                {hit.authors.map(({ title }, idx) => (
                                    <Fragment key={title}>
                                        {idx > 0 && ", "}
                                        <span
                                            className={
                                                activeFacets.authors.includes(
                                                    title
                                                )
                                                    ? "filter_active"
                                                    : undefined
                                            }
                                        >
                                            {title}
                                        </span>
                                    </Fragment>
                                ))}
                            </span>
                        )}
                        {hit.countries.length > 0 && (
                            <span className="search_countries">
                                {hit.countries.map(({ title }, idx) => (
                                    <Fragment key={title}>
                                        {idx > 0 && ", "}

                                        <span
                                            className={
                                                activeFacets.countries.includes(
                                                    title
                                                )
                                                    ? "filter_active"
                                                    : undefined
                                            }
                                        >
                                            {title}
                                        </span>
                                    </Fragment>
                                ))}
                            </span>
                        )}
                        <a
                            onClick={() =>
                                sendEvent(
                                    "click",
                                    hit,
                                    "clickedObjectIDsAfterSearch"
                                )
                            }
                            href={`/${hit.lang}/item/${hit.item_id}:${hit.slug}`}
                        >{t`Read more`}</a>
                    </article>
                </li>
            ))}
        </ol>
    ) : results != undefined && results.query != "" ? (
        <ol>
            <li>
                <article>
                    <header>
                        <h3>{t`No search results`}</h3>
                        {facets.length > 0 && (
                            <p>{t`Broaden the search by removing filters.`}</p>
                        )}
                    </header>
                </article>
            </li>
        </ol>
    ) : (
        <ol></ol>
    );
};
