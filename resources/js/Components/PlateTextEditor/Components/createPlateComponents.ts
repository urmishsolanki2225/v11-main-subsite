import {
    MARK_BOLD,
    MARK_ITALIC,
    PlateRenderElementProps,
    PlateRenderLeafProps,
    ELEMENT_LI,
    ELEMENT_OL,
    ELEMENT_UL,
    ELEMENT_PARAGRAPH,
} from "@udecode/plate";

import {
    UnorderedListComponent,
    OrderedListComponent,
    ListItemComponent,
} from "./List";
import { BoldComponent, ItalicComponent } from "./Marks";
import { ParagraphComponent } from "./Paragraph";

export const createPlateComponents = () => {
    const components: Record<
        string,
        React.FC<PlateRenderElementProps> | React.FC<PlateRenderLeafProps>
    > = {
        [ELEMENT_PARAGRAPH]: ParagraphComponent,
        [ELEMENT_UL]: UnorderedListComponent,
        [ELEMENT_OL]: OrderedListComponent,
        [ELEMENT_LI]: ListItemComponent,
        [MARK_BOLD]: BoldComponent,
        [MARK_ITALIC]: ItalicComponent,
    };
    return components;
};
