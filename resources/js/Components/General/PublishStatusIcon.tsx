import React from "react";

import PublicOffIcon from "@mui/icons-material/PublicOff";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import dayjs from "dayjs";

// Added by Cyblance for Annual-Reports section start
import { Item, Collection, Annualreport } from "../../Models";

interface IProps {
    item: Item | Collection | Annualreport;
}
// Added by Cyblance for Annual-Reports section end
const PublishStatusIcon: React.FC<IProps> = ({ item }) => {
    const theme = useTheme();
    const isPublished =
        item.status === "published" &&
        (!item.publish_at || dayjs(item.publish_at).isBefore(dayjs()));

    if (isPublished) {
        return <></>;
    }

    return (
        <Tooltip title="Unpublished">
            <PublicOffIcon
                sx={{
                    fontSize: theme.typography.fontSize,
                    color: "text.secondary",
                    marginLeft: 0.5,
                }}
            />
        </Tooltip>
    );
};

export default PublishStatusIcon;
