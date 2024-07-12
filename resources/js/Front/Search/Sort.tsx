import React from "react";

import { useTranslation } from "react-i18next";
import { useSortBy } from "react-instantsearch-hooks-web";

interface IProps {
    baseIndexName: string;
}
export const Sort: React.FC<IProps> = ({ baseIndexName }) => {
    const { t } = useTranslation();
    const { currentRefinement, refine, options } = useSortBy({
        items: [
            { label: t`Relevance`, value: baseIndexName },
            { label: t`Latest`, value: `${baseIndexName}_publish_desc` },
        ],
    });

    return (
        <div className="search_sortby">
            <span>{t`Sort by`}:</span>
            {options.map(({ value, label }) => (
                <span
                    key={value}
                    className={currentRefinement === value ? "active" : ""}
                    onClick={() => refine(value)}
                >
                    {label}
                </span>
            ))}
        </div>
    );
};
