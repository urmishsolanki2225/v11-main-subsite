import { Inertia } from "@inertiajs/inertia";
import route from "ziggy-js";

export const goEditItem = (id: number): void => {
    Inertia.get(route("admin.items.edit", { id }).toString(), {});
};
