import React, { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HelpIcon from "@mui/icons-material/Help";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Transforms, Node } from "slate";
import { ReactEditor, useSlate } from "slate-react";

import InfoDialog from "../../../General/InfoDialog";
import { isBlockActive } from "../../Toolbar/BlockButton.functions";

import { FootnoteId, typeFootnote, typeFootnoteAnchor } from "./type";

const FootnoteToolbarButton: React.FC = () => {
    const editor = useSlate();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [subAnchorEl, setSubAnchorEl] = useState<HTMLElement | null>(null);
    const [infoOpen, setInfoOpen] = useState(false);

    const [footnoteIsActive, setFootnoteIsActive] = useState(false);
    const [anchorIsActive, setAnchorIsActive] = useState(false);
    const [selection, setSelection] = useState(editor.selection);

    const [footnotes, setFootnotes] = useState<
        {
            uuid: FootnoteId;
            text: string;
        }[]
    >([]);

    const onInsert = () => {
        setAnchorEl(null);
        // insert a footnote anchor at selection and a footnote element at the end
        editor.insertFootnote(selection || undefined);
    };

    const onPick = (uuid: FootnoteId) => {
        Transforms.insertNodes(
            editor,
            [
                {
                    type: "footnote-anchor",
                    ref: uuid,
                    children: [{ text: "" }],
                },
            ],
            { at: selection || undefined }
        );
        setAnchorEl(null);
        setSubAnchorEl(null);
    };

    const findFootnotes = () => {
        setFootnotes(
            editor.footnotes().map(([footnote]) => ({
                uuid: footnote.uuid,
                text: Node.string(footnote).substr(0, 50),
            }))
        );
    };

    useEffect(() => {
        if (ReactEditor.isFocused(editor)) {
            setSelection(editor.selection);
            setFootnoteIsActive(isBlockActive(editor, typeFootnote));
            setAnchorIsActive(isBlockActive(editor, typeFootnoteAnchor));
        }
    }, [editor, editor.selection]);
    const active = footnoteIsActive || anchorIsActive;

    return (
        <>
            <IconButton
                color={active ? "primary" : undefined}
                sx={{
                    borderRadius: "0.1em",
                    backgroundColor: active ? "action.selected" : undefined,
                }}
                disabled={footnoteIsActive}
                onMouseDown={(evt) => {
                    evt.preventDefault();
                    evt.stopPropagation();
                    setAnchorEl(evt.currentTarget);
                }}
                size="small"
            >
                <BookmarkIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => {
                    setAnchorEl(null);
                    setSubAnchorEl(null);
                }}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <MenuItem onClick={() => setInfoOpen(true)}>
                    <ListItemIcon>
                        <HelpIcon />
                    </ListItemIcon>
                    <ListItemText>Footnotes help</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={(evt) => {
                        evt.stopPropagation();
                        onInsert();
                    }}
                >
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText>Insert new footnote</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={(evt) => {
                        evt.stopPropagation();
                        findFootnotes();
                        setSubAnchorEl(evt.currentTarget);
                    }}
                >
                    <ListItemIcon>
                        <ChevronLeftIcon />
                    </ListItemIcon>
                    <ListItemText>Reference existing footnote</ListItemText>
                </MenuItem>
            </Menu>
            <Menu
                anchorEl={subAnchorEl}
                open={Boolean(subAnchorEl)}
                onClose={() => {
                    setAnchorEl(null);
                    setSubAnchorEl(null);
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                {footnotes.map(({ uuid, text }) => (
                    <MenuItem key={uuid} onClick={() => onPick(uuid)}>
                        {text}
                    </MenuItem>
                ))}
            </Menu>
            <InfoDialog
                open={infoOpen}
                onClose={() => setInfoOpen(false)}
                title="Footnotes"
            >
                The footnotes will be placed at the bottom of the content and
                will be automatically placed in the order of appearance in the
                content above, i.e. the order they appear here in the editor is
                not the right order per se. <br />
                It is possible that a footnote is referenced multiple times, in
                the reference they will then get the same number. If a footnote
                is not referenced, it will be placed last with [_] in front.
                Note that it is possible to insert a reference to it, placing it
                back in the normal order.
                <br />
                When a footnote is removed, its reference in the text is removed
                as well.
            </InfoDialog>
        </>
    );
};

export default FootnoteToolbarButton;
