<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next';
import { Folder, Forward, MoreHorizontal, Trash2 } from 'lucide-vue-next';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/Components/ui/sidebar';

defineProps<{
    projects: {
        name: string;
        url: string;
        icon: LucideIcon;
    }[];
}>();

const { isMobile } = useSidebar();
</script>

<template>
    <SidebarGroup class="group-data-[collapsible=icon]:hidden">
        <!-- <SidebarGroupLabel>Developers</SidebarGroupLabel> -->
        <SidebarMenu>
            <SidebarMenuItem v-for="item in projects">
                <SidebarMenuButton>
                    <component :is="item.icon" />
                    <span>{{ item.name }}</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarGroup>
</template>
