<script setup lang="ts">
import { Check, ChevronsUpDown, Plus, Settings } from 'lucide-vue-next';
import { router, usePage } from '@inertiajs/vue3';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/Components/ui/sidebar';

const { isMobile } = useSidebar();
const page = usePage() as any;

const switchToTeam = (team: any) => {
    router.put(
        route('current-team.update'),
        {
            team_id: team.id,
        },
        {
            preserveState: false,
        },
    );
};
</script>

<template>
    <!-- Show team switcher only if team features are enabled and current team exists -->
    <SidebarMenu v-if="page.props.jetstream?.hasTeamFeatures && page.props.auth?.user?.current_team">
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <SidebarMenuButton size="lg" class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                        <div
                            class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-sm"
                        >
                            <span class="text-xs font-semibold">{{ page.props.auth?.user?.current_team?.name.substring(0, 2).toUpperCase() }}</span>
                        </div>
                        <div class="grid flex-1 text-left text-sm leading-tight">
                            <span class="truncate font-medium">
                                {{ page.props.auth?.user?.current_team?.name }}
                            </span>
                            <span class="truncate text-xs">{{ page.props.auth?.user?.current_team?.personal_team ? 'Personal' : 'Team' }}</span>
                        </div>
                        <ChevronsUpDown class="ml-auto" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    align="start"
                    :side="isMobile ? 'bottom' : 'right'"
                    :side-offset="4"
                >
                    <DropdownMenuLabel class="text-muted-foreground -mb-1 text-xs">Teams</DropdownMenuLabel>
                    <template v-if="(page.props.auth?.user?.all_teams?.length ?? 0) > 1">
                        <DropdownMenuItem
                            v-for="team in page.props.auth?.user?.all_teams || []"
                            :key="team.id"
                            class="gap-2 p-2"
                            @click="switchToTeam(team)"
                        >
                            <div class="flex size-6 items-center justify-center rounded-sm border">
                                <Check v-if="team.id === page.props.auth?.user?.current_team_id" class="size-3.5 shrink-0" />
                                <span v-else class="text-xs font-semibold">{{ team.name.substring(0, 2).toUpperCase() }}</span>
                            </div>
                            {{ team.name }}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </template>
                    <DropdownMenuItem as-child>
                        <a :href="route('teams.show', { id: page.props.auth?.user?.current_team?.id })" class="flex gap-2 p-2">
                            <div class="flex size-6 items-center justify-center rounded-md border bg-transparent">
                                <Settings class="size-4" />
                            </div>
                            <div class="font-medium">Team settings</div>
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem v-if="page.props.jetstream?.canCreateTeams" as-child>
                        <a :href="route('teams.create')" class="flex gap-2 p-2">
                            <div class="flex size-6 items-center justify-center rounded-md border bg-transparent">
                                <Plus class="size-4" />
                            </div>
                            <div class="font-medium">Create new team</div>
                        </a>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
    <!-- Fallback when no teams or team features disabled -->
    <SidebarMenu v-else>
        <SidebarMenuItem>
            <SidebarMenuButton size="lg" disabled>
                <div class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <span class="text-xs font-semibold">APP</span>
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-medium">{{ page.props.name || 'Laravel' }}</span>
                    <span class="truncate text-xs">Application</span>
                </div>
            </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
