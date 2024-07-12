import { useCallback, useState } from "react";

import axios, { AxiosProgressEvent } from "axios";

import { IErrors } from "../Models";

interface IUsePostData<T> {
    progress?: number;
    result?: T;
    errors?: IErrors;
    errorMessage?: string;
    isBusy: boolean;
    post: (url: string, data?: FormData) => void;
    reset: () => void;
}
const usePostData = <T,>(): IUsePostData<T> => {
    const [progress, setProgress] = useState<number>();
    const [result, setResult] = useState<T>();
    const [errors, setErrors] = useState<IErrors>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [isBusy, setIsBusy] = useState(false);

    const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
        setProgress(
            progressEvent.loaded / (progressEvent.total || progressEvent.loaded)
        );
    };

    const post = useCallback((url: string, data?: FormData) => {
        setIsBusy(true);
        setProgress(undefined);
        setErrors(undefined);
        setErrorMessage(undefined);
        setResult(undefined);

        axios
            .post<T>(url, data, { onUploadProgress })
            .then((response) => setResult(response.data))
            .catch((ex) => {
                setErrorMessage(ex.response?.data?.message);
                setErrors(ex.response?.data?.errors || undefined);
            });
    }, []);

    const reset = useCallback(() => {
        setIsBusy(false);
        setProgress(undefined);
        setErrors(undefined);
        setErrorMessage(undefined);
        setResult(undefined);
    }, []);

    return { progress, result, errors, errorMessage, isBusy, post, reset };
};

export default usePostData;
