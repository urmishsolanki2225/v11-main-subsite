import React from "react";

import Item from "../../Models/Item";

import ResourceCreatorEmbed from "./ResourceCreatorEmbed";
import ResourceCreatorFile from "./ResourceCreatorFile";
import ResourceCreatorImage from "./ResourceCreatorImage";
import ResourceCreatorLink from "./ResourceCreatorLink";
import ResourceCreatorVideo from "./ResourceCreatorVideo";

export interface IResourceCreatorProps {
    onCreated: (item: Item) => void;
}
interface IProps extends IResourceCreatorProps {
    type: "video" | "file" | "link" | "image" | "embed";
}
export const ResourceCreator: React.FC<IProps> = ({ type, onCreated }) => {
    switch (type) {
        case "video":
            return <ResourceCreatorVideo onCreated={onCreated} />;
        case "file":
            return <ResourceCreatorFile onCreated={onCreated} />;
        case "link":
            return <ResourceCreatorLink onCreated={onCreated} />;
        case "image":
            return <ResourceCreatorImage onCreated={onCreated} />;
        case "embed":
            return <ResourceCreatorEmbed onCreated={onCreated} />;
    }
};

export default ResourceCreator;
