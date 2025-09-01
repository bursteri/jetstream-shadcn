import type { Auth, JetstreamFeatures } from './index';

interface SocialstreamProvider {
    id: string;
    name: string;
    buttonLabel?: string;
}

interface Socialstream {
    show: boolean;
    prompt: string;
    labels: Record<string, string>;
    providers: SocialstreamProvider[];
}

declare module '@inertiajs/core' {
    interface PageProps {
        auth?: Auth;
        jetstream?: JetstreamFeatures;
        socialstream?: Socialstream;
        errors?: Record<string, string>;
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