import { useCallback, useEffect, useState } from "react";

import axios from "axios";
import route from "ziggy-js";

import { Item } from "../Models";

type ReturnType = [Item | undefined, () => void];
// type ReturnType = { item: Item | undefined; load: () => void };
const useResourceItem = (id?: number): ReturnType => {
    const [item, setItem] = useState<Item>();

    const load = useCallback(() => {
        if (!id) {
            return;
        }
        axios
            .get<Item>(route("admin.resourceitems.show", { id }))
            .then((result) => {
                console.log(result);
                setItem(result.data);
            })
            .catch((ex) => {
                console.error(ex);
            });
    }, [id]);

    useEffect(() => {
        load();
    }, [load]);

    const result: ReturnType = [item, load];
    return result;
    // return { item, load };
};

export default useResourceItem;
