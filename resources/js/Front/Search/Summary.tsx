import React from "react";

import { useTranslation } from "react-i18next";
import { useHits } from "react-instantsearch-hooks-web";

export const Summary: React.FC = () => {
    const { t } = useTranslation();
    const { results } = useHits();

    return (
        <div className="search-summary">
            {t`Search results`}: {results?.nbHits}
        </div>
    );
};
