import React from "react";

import clsx from "clsx";
import { RenderElementProps, useSelected } from "slate-react";

const ItemRender: React.FC<RenderElementProps> = ({ attributes, element }) => {
    const selected = useSelected();
    if (element.type !== "item") {
        return <></>;
    }
    const { imageUrl, title, float } = element;
    const floatClass = float ? `float-${float}` : undefined;

    return (
        <section
            className={clsx("embed-item", floatClass, { selected })}
            {...attributes}
        >
            <figure>
                <img src={imageUrl ?? "https://picsum.photos/300/150"} />
            </figure>
            <header>
                <h3>{title}</h3>
            </header>
        </section>
    );
};

export default ItemRender;
