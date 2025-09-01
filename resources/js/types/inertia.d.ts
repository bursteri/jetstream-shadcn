import type { Auth, JetstreamFeatures } from './index';

declare module '@inertiajs/core' {
    interface PageProps {
        auth?: Auth;
        jetstream?: JetstreamFeatures;
        [key: string]: any;
    }
}

declare module '@inertiajs/vue3' {
    export function usePage<T = Record<string, any>>(): {
        props: {
            value: T & {
                auth?: Auth;
                jetstream?: JetstreamFeatures;
            };
        };
    };
}