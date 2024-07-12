import { IElement } from "../types";

import MapRender from "./Render";
import MapToolbarButton from "./ToolbarButton";
import withMap from "./withEditor";

export const MapElement: IElement = {
    type: "map",
    serialize: () => "",
    deserialize: () => null,
    canDeserialize: () => false,
    Render: MapRender,
    ToolbarButton: MapToolbarButton,
    withEditor: withMap,
};

export default MapElement;
