import { useEffect, useState } from "react";

import { ImageResource } from "../Models/Resource";

export interface ImageProps {
    w?: number;
    h?: number;
    fit?: string;
}
const useImageUrl = (
    resource: ImageResource | undefined,
    imageProps?: ImageProps
): string | undefined => {
    const [url, setUrl] = useState<string>();

    useEffect(() => {
        // setUrl(
        //     resource?.path
        //         ? `/img/${resource.path.replace("img/", "")}?w=${
        //               imageProps?.w || ""
        //           }&h=${imageProps?.h || ""}&fit=${imageProps?.fit || ""}`
        //         : undefined
        // );
        setUrl(resource?.path ? `/regional-websites/${resource?.path}/card.jpg` : undefined);
    }, [resource, imageProps]);

    return url;
};

export default useImageUrl;
