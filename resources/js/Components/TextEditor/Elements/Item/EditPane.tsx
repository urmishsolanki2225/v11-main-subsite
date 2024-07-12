import React from "react";

import { IPaneProps } from "../../Toolbar/ButtonDialog";

import { ItemElementType } from "./type";

type IProps = IPaneProps<ItemElementType>;
const ItemEditPane: React.FC<IProps> = () => {
    return <p>ToDo</p>;
};

export default ItemEditPane;
