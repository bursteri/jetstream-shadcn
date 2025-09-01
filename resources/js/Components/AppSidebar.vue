<script setup lang="ts">
import type { SidebarProps } from '@/Components/ui/sidebar';

import { LayoutGrid, CodeXml, Settings2 } from 'lucide-vue-next';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import NavMain from '@/Components/NavMain.vue';
import NavUser from '@/Components/NavUser.vue';
import NavTeam from '@/Components/NavTeam.vue';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/Components/ui/sidebar';

const props = withDefaults(defineProps<SidebarProps>(), {
    collapsible: 'icon',
});

const page = usePage();

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
        },
    ];

    // Only add Team link if current_team.id exists
    if (currentTeamId) {
        settingsItems.push({
            title: 'Team',
            url: route('teams.show', { team: currentTeamId }),
        });
    }

    settingsItems.push({
        title: 'Billing',
        url: '#',
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
            },
            {
                title: 'Settings',
                url: '#',
                icon: Settings2,
                items: settingsItems,
            },
        ],
        projects: [
            {
                name: 'API',
                url: route('api-tokens.index'),
                icon: CodeXml,
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
            <NavMain v-if="$page.props.jetstream?.hasApiFeatures" :items="data.projects" />
        </SidebarContent>
        <SidebarFooter>
            <NavUser :user="data.user" />
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
</template>
