<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next';
import { ChevronRight, Dot } from 'lucide-vue-next';
import { Link } from '@inertiajs/vue3';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/Components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/Components/ui/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';

interface NavItem {
    title?: string;
    name?: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
        title: string;
        url: string;
        isActive?: boolean;
    }[];
}

defineProps<{
    items: NavItem[];
    label?: string;
}>();

const { state } = useSidebar();

// Helper function to determine if parent should show active state
const shouldParentBeActive = (item: NavItem): boolean => {
    // If sidebar is collapsed and item has active children, parent should be active
    if (state.value === 'collapsed' && item.items?.some((subItem) => subItem.isActive)) {
        return true;
    }
    return false;
};
</script>

<template>
    <SidebarGroup>
        <SidebarGroupLabel v-if="label">{{ label }}</SidebarGroupLabel>
        <SidebarMenu>
            <template v-for="item in items" :key="item.title || item.name">
                <!-- Item with sub-items: render as dropdown when collapsed, collapsible when expanded -->
                <template v-if="item.items && item.items.length > 0">
                    <!-- Dropdown for collapsed state -->
                    <SidebarMenuItem v-if="state === 'collapsed'">
                        <DropdownMenu :modal="false">
                            <DropdownMenuTrigger as-child>
                                <SidebarMenuButton :tooltip="item.title || item.name" :is-active="shouldParentBeActive(item)">
                                    <component :is="item.icon" v-if="item.icon" />
                                    <span>{{ item.title || item.name }}</span>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" align="start" :side-offset="4" class="w-48">
                                <DropdownMenuLabel class="text-muted-foreground -mb-1 text-xs">{{ item.title || item.name }}</DropdownMenuLabel>
                                <DropdownMenuItem v-for="subItem in item.items" :key="subItem.title" as-child>
                                    <Link :href="subItem.url" :class="subItem.isActive ? 'font-semibold' : ''">
                                        <Dot v-if="subItem.isActive" class="-mx-1 text-foreground" stroke-width="5" />
                                        <span>
                                            {{ subItem.title }}
                                        </span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>

                    <!-- Collapsible for expanded state -->
                    <Collapsible v-else as-child :default-open="item.items.some((subItem) => subItem.isActive)" class="group/collapsible">
                        <SidebarMenuItem>
                            <CollapsibleTrigger as-child>
                                <SidebarMenuButton :tooltip="item.title || item.name" :is-active="false">
                                    <component :is="item.icon" v-if="item.icon" />
                                    <span>{{ item.title || item.name }}</span>
                                    <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                                        <SidebarMenuSubButton as-child :is-active="subItem.isActive">
                                            <Link :href="subItem.url">
                                                <span>{{ subItem.title }}</span>
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                </template>

                <!-- Item without sub-items: render as simple button link -->
                <SidebarMenuItem v-else>
                    <SidebarMenuButton as-child :tooltip="item.title || item.name" :is-active="item.isActive">
                        <Link :href="item.url">
                            <component :is="item.icon" v-if="item.icon" />
                            <span>{{ item.title || item.name }}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </template>
        </SidebarMenu>
    </SidebarGroup>
</template>
