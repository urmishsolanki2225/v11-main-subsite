import React from "react";

import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Popover from "@mui/material/Popover";

import { Collection, findTitle } from "../../Models";
import PublishStatusIcon from "../General/PublishStatusIcon";
interface IProps {
    collection: Collection;
    onSelect: (selected: Collection) => void;
}
export const DataCellCollectionTree: React.FC<IProps> = ({
    collection,
    onSelect,
}) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    return (
        <>
            <IconButton
                onClick={(evt) => {
                    evt.stopPropagation();
                    setAnchorEl(evt.currentTarget);
                }}
                size="small"
                disabled={!collection.sub_collections?.length}
                disableRipple={true}
                style={{ alignSelf: "center" }}
            >
                <AccountTreeOutlinedIcon />
            </IconButton>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                {collection.sub_collections?.map((sub) => (
                    <Box key={sub.id} style={{ padding: "4px 8px" }}>
                        <Link
                            onMouseDown={() => onSelect(sub)}
                            variant="body2"
                            underline="always"
                            href="#"
                        >
                            {findTitle(sub) || "- no title "}
                            {<PublishStatusIcon item={sub} />}
                        </Link>
                    </Box>
                ))}
            </Popover>
        </>
    );
};

export default DataCellCollectionTree;
