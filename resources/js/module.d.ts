/// <reference types="vite/client" />
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicAttributes {
            key?: string | number | bigint | null | undefined;
        }
    }
}
