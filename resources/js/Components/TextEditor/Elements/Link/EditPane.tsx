import React, { useEffect, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import route from "ziggy-js";

import ButtonConfirmDialog from "../../../General/ButtonConfirmDialog";
import { IPaneProps } from "../../Toolbar/ButtonDialog";

import { LinkAttributes, LinkElementType } from "./type";

// interface LinkAttributes extends Attributes {
//     url?: string;
// }

type IProps = IPaneProps<LinkElementType>;
const LinkEditPane: React.FC<IProps> = ({ /*item,*/ elementIn, onChange }) => {
    const [attributes, setAttributes] = useState<LinkAttributes>({});
    const [allowEditUrl, setAllowEditUrl] = useState(false);
    const [linkType, setLinkType] = useState("");

    useEffect(() => {
        console.log("elementIncoming", elementIn);
        if (elementIn) {
            setAttributes((attrs) => ({
                ...attrs,
                dataId: elementIn.dataId,
                dataType: elementIn.dataType,
                url: elementIn.url,
                linkType: elementIn.linkType,
            }));
        }
    }, [elementIn]);

    useEffect(() => {
        setAllowEditUrl(attributes.linkType === "external");
        setLinkType(
            attributes.linkType === "external"
                ? "Link (without resource)"
                : attributes.linkType === "resource"
                ? "Link resource"
                : "Internal link"
        );
    }, [attributes]);

    useEffect(() => {
        onChange({
            ...attributes,
            type: "link",
            children: elementIn?.children || [{ text: "" }],
        });
    }, [attributes, onChange, elementIn]);

    return (
        <>
            <Box>
                <Box display="flex" flexDirection="column" width={400}>
                    {elementIn ? (
                        <>
                            <Typography variant="subtitle1">
                                {linkType}
                            </Typography>
                            {allowEditUrl ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="URL"
                                    value={attributes.url || ""}
                                    placeholder="http:// or https:// required"
                                    onChange={(e) =>
                                        setAttributes((attr) => ({
                                            ...attr,
                                            url: e.target.value,
                                        }))
                                    }
                                    InputLabelProps={{ shrink: true }}
                                />
                            ) : attributes.linkType === "resource" ? (
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                >
                                    <Tooltip title={attributes.url || false}>
                                        <div>
                                            <Button
                                                variant="text"
                                                endIcon={<OpenInNewIcon />}
                                                disabled={!attributes.url}
                                                fullWidth={false}
                                                component={Link}
                                                target="_blank"
                                                href={attributes.url}
                                                rel="noopener noreferrer"
                                            >
                                                Preview
                                            </Button>
                                        </div>
                                    </Tooltip>
                                    {attributes.dataId && false && (
                                        <ButtonConfirmDialog
                                            label="Edit Link Resource"
                                            onConfirm={() => {
                                                Inertia.get(
                                                    route("admin.items.edit", {
                                                        id: attributes.dataId!,
                                                    }).toString(),
                                                    {}
                                                );
                                            }}
                                        />
                                    )}
                                </Box>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <Typography variant="subtitle1">
                            Invalid link
                        </Typography>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default LinkEditPane;
