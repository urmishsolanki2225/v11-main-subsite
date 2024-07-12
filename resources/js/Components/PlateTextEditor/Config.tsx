import {
    MARK_BOLD,
    MARK_ITALIC,
    createBoldPlugin,
    createItalicPlugin,
    createSoftBreakPlugin,
    createExitBreakPlugin,
    createPlugins,
    ELEMENT_LI,
    ELEMENT_OL,
    ELEMENT_UL,
    createListPlugin,
    ELEMENT_PARAGRAPH,
    createParagraphPlugin,
    createResetNodePlugin,
    createDeserializeDocxPlugin,
} from "@udecode/plate";

import {
    BoldComponent,
    ItalicComponent,
    ListItemComponent,
    OrderedListComponent,
    ParagraphComponent,
    UnorderedListComponent,
} from "./Components";

export const basicPlugins = createPlugins(
    [
        createParagraphPlugin(),
        createBoldPlugin(),
        createItalicPlugin(),
        createResetNodePlugin(),
        createSoftBreakPlugin(),
        createExitBreakPlugin(),
        createListPlugin(),
        createDeserializeDocxPlugin(),
    ],
    {
        components: {
            [ELEMENT_PARAGRAPH]: ParagraphComponent,
            [ELEMENT_UL]: UnorderedListComponent,
            [ELEMENT_OL]: OrderedListComponent,
            [ELEMENT_LI]: ListItemComponent,
            [MARK_BOLD]: BoldComponent,
            [MARK_ITALIC]: ItalicComponent,
        },
    }
);
