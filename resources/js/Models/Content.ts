//

export interface Content {
    id?: number;
    lang: string;
    title: string;
    subtitle?: string;
    slug: string;
    blurb?: string;
    blurb_json?: string;
}
export default Content;

export const findTitle = (
    { contents, content }: { contents?: Content[]; content?: Content },
    lang = "en"
): string | undefined => {
    if (content?.lang === lang) {
        return content.title;
    }
    const langTitle = contents?.find((c) => c.lang === lang)?.title;
    return (
        langTitle ||
        contents?.find((c) => c.lang === "*")?.title ||
        (content?.lang === "*"
            ? content.title
            : content?.title
            ? content.title
            : contents?.length
            ? contents.at(0)?.title
            : undefined)
    );
};

export const findContent = <T extends Content>(
    { contents, content }: { contents?: T[]; content?: T },
    lang = "en"
): T | undefined => {
    return (
        (content?.lang === lang
            ? content
            : contents?.find((c) => c.lang === lang)) ||
        (lang !== "*" ? findContent({ contents, content }, "*") : undefined)
    );
};
