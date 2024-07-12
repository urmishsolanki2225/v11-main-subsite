import { useCallback, useEffect, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import isEqual from "lodash/isEqual";
import { usePrevious } from "react-use";

import Paginated from "../Models/Paginated";

import { FlatQueryParams, QueryParams, flatten } from "./General/LinkQuery";

export interface IDataSource<T> {
    paginatedData?: Paginated<T>;
    page?: number;
    setSort: (sort?: string) => void;
    setPage: (page: number) => void;
    childTypes?: string[];
    loading?: boolean;
    // filter?:
}
export interface IDataSourceProps<T> {
    mode: "inertia" | "xhr";
    paginatedData?: Paginated<T>;
    // path: string;
    filter?: QueryParams;
    search?: string;
    sort?: string;
    xhrUrl?: string;
    pageSize?: number;
    dataNotWrapped?: boolean;
}

const flattenFilterSearch = (filter?: QueryParams, search?: string) => {
    const result = { ...filter } as any;
    if (search) {
        result.filter = { ...result.filter, search };
    } else if (result.filter?.search) {
        delete result.filter.search;
    }
    return flatten(result);
};

const useDataSource = <T,>({
    mode,
    paginatedData: _paginatedData,
    filter: _filter,
    sort: _sort,
    search: _search,
    xhrUrl,
    pageSize,
    dataNotWrapped = false,
}: IDataSourceProps<T>): IDataSource<T> => {
    const [paginatedData, setPaginatedData] = useState(_paginatedData);
    const [sort, setSort] = useState(_sort || "");
    const [filter, setFilter] = useState<FlatQueryParams>(
        flattenFilterSearch(_filter, _search)
    );
    const [page, setPage] = useState(paginatedData?.current_page || 1);
    const prevPage = usePrevious(page);
    const prevSort = usePrevious(sort);
    const prevFilter = usePrevious(filter);
    const [childTypes, setChildTypes] = useState<string[]>();
    const [loading, setLoading] = useState(false);

    // const updateFilter = (params: QueryParams) => {
    //     setFilter((filter) => {
    //         const newFilter = flatten(params);
    //         if (diff(filter, newFilter)) {
    //             updatePage(1);
    //             return newFilter;
    //         } else {
    //             return filter;
    //         }
    //     });
    // };

    const updatePage = (newPage: number) => {
        setPage((page) => {
            if (page === newPage) {
                return page;
            }
            if (!page && newPage === 1) {
                return page;
            }
            if (!newPage && page === 1) {
                return page;
            }
            return newPage;
        });
    };

    const updateSort = useCallback((newSort?: string) => {
        if (!newSort) {
            // catches null, undefined, empty string
            return;
        }
        setSort(newSort || "");
    }, []);

    useEffect(() => {
        updateSort(_sort);
    }, [_sort, updateSort]);

    useEffect(() => {
        const params = flattenFilterSearch(_filter, _search);
        setFilter((filter) => {
            const newFilter = flatten(params);
            if (!isEqual(filter, newFilter)) {
                updatePage(1);
                return newFilter;
            } else {
                return filter;
            }
        });
        // updateFilter(flattenFilterSearch(_filter, _search));
        // // always jump to first page when filter changes
        // updatePage(1);
    }, [_search, _filter]);

    useEffect(() => {
        setPaginatedData(_paginatedData);
        updatePage(_paginatedData?.current_page || 1);
    }, [_paginatedData]);

    useEffect(() => {
        if (mode === "xhr") {
            return;
        }
        if (!paginatedData) {
            return;
        }
        // console.log("we have changes?", prevPage, prevSort, prevFilter);
        if (!prevPage && !prevSort && !prevFilter) {
            // console.log("no Change cuz init");
            return;
        }
        if (prevPage !== page) {
            // console.warn("page", prevPage, page);
        } else if (prevSort !== sort) {
            // console.warn("sort", prevSort, sort);
        } else if (prevFilter !== filter) {
            // console.warn("filter", prevFilter, filter);
        } else {
            // console.log("no change");
            return;
        }

        setLoading(true);
        Inertia.get(
            paginatedData?.path,
            {
                page: page,
                sort: sort,
                ...filter,
            },
            { preserveState: true }
        );
    }, [
        page,
        prevPage,
        sort,
        prevSort,
        filter,
        prevFilter,
        paginatedData,
        mode,
    ]);

    useEffect(() => {
        if (mode === "inertia") {
            return Inertia.on("finish", () => setLoading(false));
        }
    }, [mode]);

    useEffect(() => {
        if (mode === "xhr" && xhrUrl && Object.keys(filter).length) {
            setLoading(true);
            axios
                .get<any>(xhrUrl, {
                    params: {
                        _format: "json",
                        ["page[number]"]: page,
                        ["page[size]"]: pageSize,
                        sort: sort,
                        ...filter,
                    },
                })
                .then((result) => {
                    if (!result.data) {
                        return;
                    }
                    if (dataNotWrapped) {
                        setPaginatedData(result.data);
                        return;
                    }
                    const m = xhrUrl.match(/\w+$/);
                    const dataKey = m ? m[0] : "data";
                    const _data = { ...result.data };
                    setPaginatedData(_data[dataKey]);
                    setChildTypes(result.data.child_types);
                })
                .finally(() => setLoading(false));
        }
    }, [mode, xhrUrl, page, sort, filter, pageSize, dataNotWrapped]);

    return {
        paginatedData,
        page,
        setPage: updatePage,
        setSort: updateSort,
        childTypes,
        loading,
    };
};

export default useDataSource;
