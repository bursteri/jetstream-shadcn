import type { Auth, JetstreamFeatures } from './index';

export interface SocialstreamProvider {
    id: string;
    name: string;
    buttonLabel?: string;
}

export interface ConnectedAccount {
    id: number;
    provider: string;
    avatar_path?: string;
    created_at: string;
}

export interface Socialstream {
    show: boolean;
    prompt: string;
    labels: Record<string, string>;
    providers: SocialstreamProvider[];
    connectedAccounts: ConnectedAccount[];
    hasPassword: boolean;
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