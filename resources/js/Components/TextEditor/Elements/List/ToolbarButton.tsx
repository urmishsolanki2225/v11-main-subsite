import React from "react";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

import BlockButton from "../../Toolbar/BlockButton";
import MultiButton from "../../Toolbar/MultiButton";

export const OrderedListToolbarButton: React.FC = () => {
    return (
        <MultiButton
            formats={["ordered-list"]}
            baseButton={
                <BlockButton format="ordered-list">
                    <FormatListNumberedIcon />
                </BlockButton>
            }
        >
            <BlockButton
                tooltip="Default"
                format="ordered-list"
                attributes={{}}
            >
                O
            </BlockButton>{" "}
            <BlockButton
                tooltip="Variant A"
                format="ordered-list"
                attributes={{ variant: "variant-a" }}
            >
                A
            </BlockButton>{" "}
            <BlockButton
                tooltip="Variant B"
                format="ordered-list"
                attributes={{ variant: "variant-b" }}
            >
                B
            </BlockButton>
        </MultiButton>
    );
};

export const UnorderedListToolbarButton: React.FC = () => {
    return (
        <MultiButton
            formats={["unordered-list"]}
            baseButton={
                <BlockButton format="unordered-list">
                    <FormatListBulletedIcon />
                </BlockButton>
            }
        >
            <BlockButton
                tooltip="Default"
                format="unordered-list"
                attributes={{}}
            >
                O
            </BlockButton>

            <BlockButton
                tooltip="Variant A"
                format="unordered-list"
                attributes={{ variant: "variant-a" }}
            >
                A
            </BlockButton>

            <BlockButton
                tooltip="Variant B"
                format="unordered-list"
                attributes={{ variant: "variant-b" }}
            >
                B
            </BlockButton>
        </MultiButton>
    );
};
