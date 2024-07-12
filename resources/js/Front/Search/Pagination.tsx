import React from "react";

import { usePagination, useHits } from "react-instantsearch-hooks-web";

export const Pagination: React.FC = () => {
    const { pages, currentRefinement: currentPage, refine } = usePagination();
    const { hits } = useHits();

    return (
        <nav>
            {hits.length > 0 && (
                <ul className="pagination">
                    {pages.map((pageIdx) => (
                        <li
                            key={pageIdx}
                            className={
                                pageIdx === currentPage
                                    ? "page-item active"
                                    : "page-item"
                            }
                            onClick={() => refine(pageIdx)}
                        >
                            <span className="page-link">{pageIdx + 1}</span>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};
