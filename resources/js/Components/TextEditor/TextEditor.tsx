import React, { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import { useFormControl } from "@mui/material/FormControl";
import { styled, useTheme } from "@mui/material/styles";
import isEqual from "lodash/isEqual";
import { useDebounce, usePrevious } from "react-use";
import {
    Editor,
    createEditor,
    Descendant,
    Transforms,
    Node,
    Element,
    Text,
} from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";

import { TEXTEDIT_DEBOUNCE_MS } from "../../Config";

import { parse } from "./deserialize";
import { withElements } from "./Elements";
import { RenderElement, RenderLeaf } from "./render";
import Toolbar from "./Toolbar/Toolbar";
import withHtml from "./withHtml";

const StyledEditable = styled(Editable)(({ theme }) => ({
    minHeight: "20vh",
    maxHeight: "60vh",
    overflowY: "auto",
    zIndex: 10,
    paddingRight: "calc(100% - 600px)",

    "& .selected": {
        background: "rgba(200,200,200,0.5)",
        position: "relative",
    },
    "& .selected .selected": {
        // background: theme.palette.grey[300],
        position: "relative",
    },
    "& .selected .selected .selected": {
        // background: theme.palette.grey[400],
        position: "relative",
    },
    "&  > .selected::before": {
        content: "attr(data-slate-type)",
        fontStyle: "italic",
        fontSize: theme.typography.fontSize * 0.7,
        lineHeight: 1,
        color: theme.palette.text.disabled,
        position: "absolute",
        top: "-1.3em",
        backgroundColor: "rgba(255,255,255,0.5)",
    },
    "& a[data-slate-type=link]": {
        textDecoration: "underline",
        color: theme.palette.primary.main,
    },
    "& figure": {
        clear: "both",
        position: "relative",
    },
    "& figure.selected::before": {
        content: "'Actual embedded content will be shown larger'",
        fontStyle: "italic",
        fontSize: theme.typography.caption.fontSize,
        color: theme.palette.primary.light,
        position: "absolute",
        top: "-1.3em",
    },
    "& figure.quote.selected::before": {
        content: "'quote'",
    },
    "& figure img": {
        maxHeight: 100,
        pointerEvents: "none",
    },
    "& figure iframe": {
        height: 100,
        pointerEvents: "none",
    },
    "& figure.float-left": {
        float: "left",
        width: "50%",
    },
    "& figure.float-right": {
        float: "right",
        width: "50%",
    },
    "& figcaption.empty": {
        position: "relative",

        "&::after": {
            content: "'caption (optional)'",
            fontStyle: "italic",
            fontSize: theme.typography.fontSize * 0.7,
            color: theme.palette.primary.light,
            position: "absolute",
            top: 0,
        },
    },
}));

interface IProps {
    text?: string;
    json?: string;
    // onChange: (text: string) => void;
    onChangeJson: (json: string | null) => void;
    mode: "full" | "limited";
}
const TextEditor: React.FC<IProps> = ({
    text: _text,
    json: _json,
    mode,
    onChangeJson,
}) => {
    const theme = useTheme();
    const [text] = useState(_text);
    const [json] = useState(_json);
    const [originalJsonObj] = useState(JSON.parse(_json || "[]"));
    const editor = useMemo(
        () => withElements(withHtml(withHistory(withReact(createEditor())))),
        []
    );
    const [jsonValue, setJsonValue] = useState<any>();
    const previousJsonValue = usePrevious(jsonValue);

    const [value, setValue] = useState<Descendant[]>([]);
    const [fullscreen, setFullscreen] = useState(false);
    const previousTextIn = usePrevious(text);
    const ctx = useFormControl();

    useEffect(() => {
        if (text && !json) {
            if (text !== previousTextIn) {
                const parsed = parse(text || "");
                setJsonValue((jsonVal: any) =>
                    isEqual(jsonVal, parsed) ? jsonVal : parsed
                );
            }
        } else if (json) {
            const parsed = JSON.parse(json);
            if (!parsed?.length) {
                setJsonValue([{ type: "paragraph", children: [{ text: "" }] }]);
            } else {
                setJsonValue((jsonVal: any) =>
                    isEqual(jsonVal, parsed) ? jsonVal : parsed
                );
            }
        } else {
            setJsonValue([{ type: "paragraph", children: [{ text: "" }] }]);
        }
    }, [text, previousTextIn, json]);

    useEffect(() => {
        if (!jsonValue) {
            return;
        }
        if (isEqual(jsonValue, previousJsonValue)) {
            return;
        }
        editor.children = jsonValue.filter((node: any) => {
            if (node.type === "paragraph") {
                if (
                    node.children.find(
                        (n: Node) =>
                            Element.isElement(n) ||
                            (Text.isText(n) && n.text.trim())
                    )
                ) {
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        });
        if (!editor.children.length) {
            // minimum 1 paragraph
            editor.children = [{ type: "paragraph", children: [{ text: "" }] }];
        }
        if (editor.selection) {
            Transforms.deselect(editor);
        }
        Editor.normalize(editor, { force: true });
        setValue(editor.children);
    }, [jsonValue, previousJsonValue, editor]);

    const [, cancelDebouncer] = useDebounce(
        () => {
            if (!isEqual(value, originalJsonObj)) {
                if (
                    value.length === 1 &&
                    Element.isElement(value[0]) &&
                    (value[0] as Element).children.length === 1 &&
                    Text.isText((value[0] as Element).children[0]) &&
                    ((value[0] as Element).children[0] as Text).text === ""
                ) {
                    // emit null
                    onChangeJson(null);
                } else {
                    const json = JSON.stringify(value);
                    onChangeJson(json);
                }
            }
        },
        TEXTEDIT_DEBOUNCE_MS,
        [value]
    );

    useEffect(() => {
        return cancelDebouncer;
    }, [cancelDebouncer]);

    return (
        <Box
            pl={2}
            pt={1}
            pb={2}
            pr={0}
            sx={
                fullscreen
                    ? {
                          position: "fixed",
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                          zIndex: theme.zIndex.drawer + 10,
                          backgroundColor: "background.paper",

                          "& $editarea": {
                              maxHeight: `calc(100% - ${theme.spacing(4)})`,
                          },
                          "& $toolbar": {
                              position: "relative",
                          },
                      }
                    : {}
            }
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    border: "1px solid",
                    borderColor: ctx?.focused ? "primary.main" : "divider",
                    borderRadius: 1,
                    pointerEvents: "none",
                    "&:hover": {
                        borderColor: "text.primary",
                    },
                    borderWidth: ctx?.focused && !fullscreen ? 2 : undefined,
                    zIndex: ctx?.focused ? theme.zIndex.appBar + 5 : undefined,
                }}
            ></Box>
            <Slate editor={editor} initialValue={value} onChange={setValue}>
                <Toolbar
                    mode={mode}
                    fullscreen={fullscreen}
                    setFullscreen={setFullscreen}
                    sx={{
                        height: theme.spacing(4),
                        marginLeft: -2,
                        marginRight: 0,
                        marginTop: -0.8,
                        paddingRight: 2,
                        paddingLeft: 2,
                        paddingTop: 0,
                        paddingBottom: 0,
                        borderColor: "divider",
                        borderStyle: "solid",
                        borderWidth: 1,
                        borderTopWidth: 0,
                        position: fullscreen ? "relative" : "sticky",
                        top: 0,
                        backgroundColor: "background.paper",
                        zIndex: theme.zIndex.appBar + 1,
                    }}
                />
                <StyledEditable
                    onFocus={ctx?.onFocus}
                    onBlur={ctx?.onBlur}
                    renderElement={RenderElement}
                    renderLeaf={RenderLeaf}
                    // className={classes.editarea}
                />
            </Slate>
        </Box>
    );
};

export default TextEditor;
