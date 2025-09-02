<script setup lang="ts">
import { computed } from 'vue';
import { Monitor, Moon, Sun } from 'lucide-vue-next';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/Components/ui/sidebar';
import { useAppearance } from '@/composables/useAppearance';

const { appearance, updateAppearance } = useAppearance();
const { isMobile } = useSidebar();

const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
] as const;

const currentIcon = computed(() => {
    const theme = themes.find((t) => t.value === appearance.value);
    return theme?.icon || Monitor;
});
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton tooltip="Theme">
                        <component :is="currentIcon" class="size-4" />
                        <span>Theme</span>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="start" class="w-48">
                    <DropdownMenuItem v-for="theme in themes" :key="theme.value" @click="updateAppearance(theme.value)" class="cursor-pointer">
                        <component :is="theme.icon" class="mr-2 h-4 w-4" />
                        <span>{{ theme.label }}</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
