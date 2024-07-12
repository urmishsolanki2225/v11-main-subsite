import React, { useEffect, useState } from "react";

import { IPaneProps } from "../../Toolbar/ButtonDialog";

import { FootnoteAttributes, FootnoteElementType, typeFootnote } from "./type";

type IProps = IPaneProps<FootnoteElementType>;
const FootnoteEditPane: React.FC<IProps> = ({
    /*item,*/ elementIn,
    onChange,
}) => {
    const [attributes] = useState<FootnoteAttributes>({
        uuid: "",
    });

    // useEffect(() => {}, [elementIn]);

    // useEffect(() => {}, [attributes]);

    useEffect(() => {
        onChange({
            ...attributes,
            type: typeFootnote,
            children: elementIn?.children || [
                { type: "paragraph", children: [{ text: "" }] },
            ],
        });
    }, [attributes, onChange, elementIn]);

    return <></>;
};

export default FootnoteEditPane;
