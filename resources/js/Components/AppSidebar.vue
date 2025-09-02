<script setup lang="ts">
import type { SidebarProps } from '@/Components/ui/sidebar';

import { LayoutGrid, CodeXml, Settings2 } from 'lucide-vue-next';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import NavMain from '@/Components/NavMain.vue';
import NavUser from '@/Components/NavUser.vue';
import NavTeam from '@/Components/NavTeam.vue';
import AppearanceToggle from '@/Components/AppearanceToggle.vue';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/Components/ui/sidebar';

const props = withDefaults(defineProps<SidebarProps>(), {
    collapsible: 'icon',
});

const page = usePage();

// Helper function to check if a route is active
const isActiveRoute = (routeName: string): boolean => {
    // Access the current route name from Ziggy
    const currentRouteName = (window as any).route().current();
    return currentRouteName === routeName || currentRouteName?.startsWith(routeName + '.');
};

// Use computed to make it reactive
const data = computed(() => {
    const userData = (page.props as any)?.auth?.user || {
        name: 'User',
        email: 'user@example.com',
        profile_photo_url: null,
    };

    const currentTeamId = (page.props as any)?.auth?.user?.current_team?.id;

    const settingsItems = [
        {
            title: 'General',
            url: route('profile.show'),
            isActive: isActiveRoute('profile.show'),
        },
    ];

    // Only add Team link if current_team.id exists
    if (currentTeamId) {
        settingsItems.push({
            title: 'Team',
            url: route('teams.show', { team: currentTeamId }),
            isActive: isActiveRoute('teams.show'),
        });
    }

    settingsItems.push({
        title: 'Billing',
        url: '#',
        isActive: false,
    });

    return {
        user: {
            name: userData.name,
            email: userData.email,
            avatar: userData.profile_photo_url || null,
        },
        navMain: [
            {
                title: 'Dashboard',
                url: route('dashboard'),
                icon: LayoutGrid,
                isActive: isActiveRoute('dashboard'),
            },
            {
                title: 'Settings',
                url: '#',
                icon: Settings2,
                items: settingsItems,
                // Parent should not have active state when it has sub-items
                isActive: false,
            },
        ],
        projects: [
            {
                name: 'API',
                url: route('api-tokens.index'),
                icon: CodeXml,
                isActive: isActiveRoute('api-tokens.index'),
            },
            {
                name: 'Home',
                url: route('home'),
                icon: CodeXml,
                isActive: isActiveRoute('home'),
            },
        ],
    };
});
</script>

<template>
    <Sidebar v-bind="props" variant="inset">
        <SidebarHeader>
            <NavTeam />
        </SidebarHeader>
        <SidebarContent>
            <NavMain :items="data.navMain" label="Platform" />
            <NavMain v-if="(page.props as any).jetstream?.hasApiFeatures" :items="data.projects" />
        </SidebarContent>
        <SidebarFooter>
            <AppearanceToggle />
            <NavUser :user="data.user" />
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
</template>
