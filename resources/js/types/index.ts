import type { LucideIcon } from 'lucide-vue-next';
import type { PageProps } from '@inertiajs/core';


export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon;
    isActive?: boolean;
}

export interface JetstreamFeatures {
    hasTeamFeatures: boolean;
    canCreateTeams: boolean;
    hasApiFeatures: boolean;
    canUpdateProfileInformation: boolean;
    canUpdatePassword: boolean;
    canManageTwoFactorAuthentication: boolean;
    hasAccountDeletionFeatures: boolean;
    hasTermsAndPrivacyPolicyFeature: boolean;
    managesProfilePhotos: boolean;
}

export interface SharedData extends PageProps {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    jetstream?: JetstreamFeatures;
}

export interface Team {
    id: number;
    name: string;
    personal_team: boolean;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    profile_photo_url?: string;
    email_verified_at: string | null;
    current_team?: Team;
    current_team_id?: number;
    all_teams?: Team[];
    created_at: string;
    updated_at: string;
}

export type BreadcrumbItemType = BreadcrumbItem;
