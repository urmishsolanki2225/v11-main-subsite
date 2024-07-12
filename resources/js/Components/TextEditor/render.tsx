import React from "react";

import { Text } from "slate";
import { RenderElementProps, RenderLeafProps, useSelected } from "slate-react";

import { loadElements } from "./Elements";

const Elements = loadElements();

const GenericRender: React.FC<RenderElementProps> = ({
    element,
    attributes,
    children,
}) => {
    const selected = useSelected();
    const className = selected ? "selected" : "";
    const attrs = { ...attributes, className, "data-slate-type": element.type };
    // simples
    switch (element.type) {
        case "blockquote":
        case "cite":
            return <element.type {...attrs}>{children}</element.type>;
        case "caption":
            if (
                !element.children.find(
                    (child) => Text.isText(child) && child.text
                )
            ) {
                attrs.className += " empty";
            }
            return <figcaption {...attrs}>{children}</figcaption>;
        // case "header":
        //     return <header {...attrs}>{children}</header>;
        case "heading":
            switch (element.level) {
                case 3:
                    return (
                        <h3 {...attrs} data-slate-type="heading-3">
                            {children}
                        </h3>
                    );
                case 4:
                    return (
                        <h4 {...attrs} data-slate-type="heading-4">
                            {children}
                        </h4>
                    );
                case 5:
                    return (
                        <h5 {...attrs} data-slate-type="heading-5">
                            {children}
                        </h5>
                    );
                case 6:
                    return (
                        <h6 {...attrs} data-slate-type="heading-6">
                            {children}
                        </h6>
                    );
            }
            break;
        // case "heading-3":
        //     return <h3 {...attrs}>{children}</h3>;
        // case "heading-4":
        //     return <h4 {...attrs}>{children}</h4>;
        // case "heading-5":
        //     return <h5 {...attrs}>{children}</h5>;
        // case "heading-6":
        //     return <h6 {...attrs}>{children}</h6>;
        case "list-item":
            return <li {...attrs}>{children}</li>;
        case "ordered-list":
            element.variant && (attrs.className += " " + element.variant);
            return <ol {...attrs}>{children}</ol>;
        case "unordered-list":
            return <ul {...attrs}>{children}</ul>;
        default:
            return <p {...attrs}>{children}</p>;
    }
    return <p {...attrs}>{children}</p>;
};

export const RenderElement = (props: RenderElementProps) => {
    const { element } = props;
    const selected = useSelected();
    const className = selected ? "selected" : undefined;
    const attrs = {
        ...props.attributes,
        className,
        "data-slate-type": element.type,
    };

    if (
        Elements[element.type as string] &&
        Boolean(Elements[element.type as string].Render)
    ) {
        // custom renderer
        const Renderer = Elements[element.type as string].Render;
        return <Renderer {...props} attributes={attrs} />;
    } else {
        return <GenericRender {...props} attributes={attrs} />;
    }
};

export const RenderLeaf = (props: RenderLeafProps) => {
    let { children } = props;
    const { attributes, leaf } = props;
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }
    if (leaf.italic) {
        children = <em>{children}</em>;
    }
    if (leaf.quote) {
        children = <q>{children}</q>;
    }
    return <span {...attributes}>{children}</span>;
};
