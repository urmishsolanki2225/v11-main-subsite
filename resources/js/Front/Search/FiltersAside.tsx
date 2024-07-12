import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { useCurrentRefinements, useHits } from "react-instantsearch-hooks-web";

import { CategoryFilter } from "./CategoryFilter";
import { MultiFilter } from "./MultiFilter";

export const FiltersAside: React.FC = () => {
    const { t } = useTranslation();
    const [showFilters, setShowFilters] = useState(false);
    const toggleShowFilters = () => {
        setShowFilters((show) => !show);
    };
    const { hits } = useHits();
    const { items: facets } = useCurrentRefinements();

    return (
        <aside
            className={
                showFilters
                    ? "active"
                    : !hits.length && !facets.length
                    ? "inactive"
                    : undefined
            }
        >
            <h3 onClick={toggleShowFilters}>{t`Filters`}</h3>
            <CategoryFilter categories={[]} />
            <MultiFilter
                attribute="year"
                label={t`Year`}
                placeholder={t`Filter by year`}
                refinementListProps={{
                    sortBy: ["name:desc", "count:desc"],
                }}
            />
            <MultiFilter
                attribute="countries.title"
                label={t`Country`}
                placeholder={t`Type to filter by country`}
            />
            <MultiFilter
                attribute="authors.title"
                label={t`Author`}
                placeholder={t`Type to filter by author`}
            />
        </aside>
    );
};
