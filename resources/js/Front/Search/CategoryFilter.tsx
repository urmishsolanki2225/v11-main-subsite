import React from "react";

import InfoIcon from "@mui/icons-material/Info";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";
import {
    useCurrentRefinements,
    useRefinementList,
} from "react-instantsearch-hooks-web";

interface IProps {
    categories?: string[];
}
export const CategoryFilter: React.FC<IProps> = () => {
    const { t, i18n } = useTranslation();
    const { refine, items } = useRefinementList({
        attribute: "categories",
        sortBy: ["count:desc", "name:asc"],
        showMore: true,
    });
    const currentRefinements = useCurrentRefinements({
        includedAttributes: ["categories"],
    });

    const categories = [
        "Articles",
        "EI Research",
        "Other Publications",
        "World Congress resolutions",
    ].map((category) => ({
        label: t(category),
        refinement: items.find(({ value }) => value === t(category)),
        currentRefinement: currentRefinements.items
            .find(({ attribute }) => attribute === "categories")
            ?.refinements.find(({ value }) => value === t(category)),
        tooltip: i18n.exists(`${category}_search_tooltip`)
            ? t(`${category}_search_tooltip`)
            : undefined,
    }));

    return (
        <>
            <p>{t`search_categories_explain`}</p>
            <ul>
                {categories.map(
                    ({ label, refinement, tooltip, currentRefinement }) => (
                        <li key={label}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            Boolean(refinement?.isRefined) ||
                                            Boolean(currentRefinement)
                                        }
                                        onChange={() => refine(label)}
                                        disabled={
                                            currentRefinement
                                                ? false
                                                : !refinement
                                        }
                                    />
                                }
                                label={`${label} (${refinement?.count || 0})`}
                            />
                            {tooltip && (
                                <Tooltip
                                    title={tooltip}
                                    placement="top"
                                    enterTouchDelay={200}
                                >
                                    <InfoIcon
                                        sx={{
                                            fontSize: 12,
                                            color: "action.active",
                                        }}
                                    />
                                </Tooltip>
                            )}
                        </li>
                    )
                )}
                {/* {items.map(({ count, isRefined, label, value }) => (
                    <li key={value}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isRefined}
                                    onChange={() => refine(value)}
                                />
                            }
                            label={`${label} (${count})`}
                        />
                    </li>
                ))} */}
            </ul>
        </>
    );
};
