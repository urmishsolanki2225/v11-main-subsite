import React from "react";

import Box from "@mui/material/Box";

import { useAppContext } from "../Layout";
import { Item } from "../Models";

import ButtonConfirmDialog from "./General/ButtonConfirmDialog";
import { get as inertiaGet } from "./General/LinkQuery";

interface IProps {
    item: Item;
}
const ImageResourceContext: React.FC<IProps> = ({ item }) => {
    const { needSave } = useAppContext();
    return (
        <Box>
            This image resource is used for{" "}
            {item.image_for_items_count ? (
                <ButtonConfirmDialog
                    label={`${item.image_for_items_count} items`}
                    color="primary"
                    needConfirmation={needSave}
                    onConfirm={() => {
                        inertiaGet("admin.items.index", {
                            filter: {
                                ["imageitem.id"]: item.id,
                            },
                        });
                    }}
                    variant="outlined"
                />
            ) : (
                <>0 items</>
            )}{" "}
            and for{" "}
            {item.image_for_collections_count ? (
                <ButtonConfirmDialog
                    label={`${item.image_for_collections_count} collections`}
                    color="primary"
                    needConfirmation={needSave}
                    onConfirm={() => {
                        inertiaGet("admin.collections.index", {
                            filter: {
                                ["imageitem.id"]: item.id,
                            },
                        });
                    }}
                    variant="outlined"
                />
            ) : (
                <>0 collections</>
            )}
        </Box>
    );
};

export default ImageResourceContext;
