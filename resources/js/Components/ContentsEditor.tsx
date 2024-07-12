import React, {
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useReducer,
    useState,
} from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { pascalCase } from "pascal-case";
import { useList } from "react-use";

import { ItemSubtype } from "../Config";
import Content from "../Models/Content";
// import { useDispatch } from "../Stores/DispatchProvider";
import contentsReducer from "../Stores/contentsReducer";
// import useUpdateContent from "../Stores/useUpdateContent";
import { LanguageProvider } from "../Utils/LanguageContext";

import ButtonConfirmDialog from "./General/ButtonConfirmDialog";
import DebounceTextField from "./General/DebounceTextField";
import LanguageTabs from "./General/LanguageTabs";
import TabPanel from "./General/TabPanel";
import TextEditor from "./TextEditor";

export interface EditorProps<T> {
    content: T;
    itemSubtype: ItemSubtype | undefined;
    onChange: (field: string, value: any) => void;
}

interface IProps<T> {
    contents: T[];
    fields: string[];
    htmlFields?: { [key: string]: "full" | "limited" };
    itemSubtype?: ItemSubtype;
    additionalEditor?: React.ComponentType<EditorProps<T>>;
    onChange: (contents: T[]) => void;
}
const ContentsEditor = <T extends Content>({
    contents: _contents,
    // contents,
    fields: _fields,
    htmlFields: _htmlFields,
    itemSubtype,
    additionalEditor: AdditionalEditor,
    onChange,
}: // onChange,
PropsWithChildren<IProps<T>>) => {
    const [lang, setLang] = useState<string | undefined>(_contents.at(0)?.lang);
    const [contents, dispatch] = useReducer(contentsReducer<T>(), _contents);
    const [fields] = useList(_fields);
    const [htmlFields] = useState(_htmlFields);
    const theme = useTheme();

    const handleFieldChangeMap = useMemo(() => {
        const handlers = new Map<string, (value: any) => void>();
        if (!lang) {
            return handlers;
        }
        const fieldsToHandle = [
            ...fields,
            ...Object.keys(htmlFields || []).map((field) => `${field}_json`),
        ];
        fieldsToHandle.forEach((field) =>
            handlers.set(field, (valueOrEvent: any) => {
                const value = valueOrEvent?.target?.value
                    ? valueOrEvent.target.value
                    : valueOrEvent;
                dispatch({ type: "content_update", field, value, lang });
            })
        );
        return handlers;
    }, [fields, htmlFields, lang]);

    const handleFieldChange = useCallback(
        (field: string, value: string) => {
            dispatch({ type: "content_update", field, value, lang: lang! });
        },
        [lang]
    );

    // const onAddedLanguage = (contents: T[], addedLang: string) => {
    const onAddLanguage = (addedLang: string) => {
        // setContents(contents);
        dispatch({
            type: "content_add",
            lang: addedLang,
            content: contents.find((content) => content.lang === lang),
            fields,
        });
        setLang(addedLang);
        // onChange && onChange(contents);
    };

    const removeLanguage = (removedLang: string) => {
        const newContents = contents.filter(
            (content) => content.lang !== removedLang
        );
        if (!newContents.length) {
            console.warn("don't allow remove all");
            return;
        }
        // setContents(newContents);
        if (lang === removedLang) {
            setLang(newContents.at(0)?.lang);
        }
        dispatch({ type: "content_remove", lang: removedLang });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch({ type: "content_reset", contents: _contents });
            setLang((lang) => {
                if (_contents.find((c) => c.lang === lang)) {
                    return lang;
                } else {
                    return _contents.length ? _contents[0].lang : undefined;
                }
            });
        }, 100);
        return () => clearTimeout(timer);
    }, [_contents]);

    useEffect(() => {
        onChange(contents);
    }, [onChange, contents]);

    return (
        <Paper sx={{ px: 2 }}>
            {!contents?.length && (
                <Typography color="warning" variant="body1">
                    No contents yet, add a language
                </Typography>
            )}
            <LanguageProvider language={lang}>
                <LanguageTabs
                    onChange={setLang}
                    // onAdded={onAddedLanguage}
                    onAdd={onAddLanguage}
                    language={lang}
                    contents={contents}
                    showAdd
                />
                {contents.map((content, i) => (
                    <TabPanel show={content.lang === lang} key={i}>
                        <Box display="flex" flexDirection="row-reverse">
                            <ButtonConfirmDialog
                                label={`Remove this language variant (${lang})`}
                                color="secondary"
                                onConfirm={() => removeLanguage(content.lang)}
                                icon={<DeleteIcon />}
                                buttonProps={{
                                    size: "small",
                                    disabled: contents.length === 1,
                                }}
                            >
                                Removing cannot be undone.
                            </ButtonConfirmDialog>
                        </Box>
                        <Box display="flex" flexDirection="column">
                            {fields.map((field, j) =>
                                htmlFields && htmlFields[field] ? undefined : (
                                    <DebounceTextField
                                        key={j}
                                        label={pascalCase(field)}
                                        value={(content as any)[field] || ""}
                                        onChange={handleFieldChangeMap.get(
                                            field
                                        )}
                                    />
                                )
                            )}
                            {AdditionalEditor && (
                                <>
                                    <AdditionalEditor
                                        content={content}
                                        itemSubtype={itemSubtype}
                                        onChange={handleFieldChange}
                                    />
                                    {/* <Typography variant="h6">
                                        Content
                                    </Typography> */}
                                </>
                            )}
                            {fields.map((field, j) =>
                                htmlFields && htmlFields[field] ? (
                                    <FormControl
                                        key={j}
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <InputLabel
                                            sx={{
                                                backgroundColor:
                                                    "background.paper",
                                                paddingLeft: "5px",
                                                marginLeft: "-5px",
                                                paddingRight: "5px",
                                                marginRight: "-5px",
                                                zIndex:
                                                    theme.zIndex.appBar + 10,
                                            }}
                                            shrink
                                            // style={{ backgroundColor: "white" }}
                                        >
                                            {pascalCase(field)}
                                        </InputLabel>
                                        <TextEditor
                                            text={(content as any)[field]}
                                            json={
                                                (content as any)[
                                                    `${field}_json`
                                                ]
                                            }
                                            mode={htmlFields[field]}
                                            // onChange={
                                            //     handleFieldChangeMap.get(field)!
                                            // }
                                            onChangeJson={
                                                handleFieldChangeMap.get(
                                                    `${field}_json`
                                                )!
                                            }
                                        />
                                    </FormControl>
                                ) : undefined
                            )}
                        </Box>
                    </TabPanel>
                ))}
            </LanguageProvider>
        </Paper>
    );
};

export default ContentsEditor;
