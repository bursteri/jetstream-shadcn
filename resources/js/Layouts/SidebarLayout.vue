<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import AppSidebar from '@/Components/AppSidebar.vue';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/Components/ui/breadcrumb';
import { Separator } from '@/Components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar';
import { Toaster } from 'vue-sonner';
import 'vue-sonner/style.css'; // vue-sonner v2 requires this import
import { useFlashMessages } from '@/composables/useFlashMessages';

interface Props {
    title?: string;
    breadcrumbs?: Array<{
        label: string;
        href?: string;
        current?: boolean;
    }>;
}

defineProps<Props>();

// Initialize flash message handling
useFlashMessages();
</script>

<template>
    <div class="flex h-screen flex-col">
        <Head :title="title" />

        <Toaster position="top-right" />

        <SidebarProvider class="flex flex-1 overflow-hidden">
            <AppSidebar />
            <SidebarInset class="flex h-full flex-col overflow-hidden">
                <header
                    class="flex h-14 shrink-0 items-center gap-2 border-b border-zinc-900/5 transition-[width,height] ease-linear dark:border-zinc-800"
                >
                    <div class="flex items-center gap-2 px-4">
                        <SidebarTrigger class="-ml-1" />
                        <Separator orientation="vertical" class="mr-2 h-4" />

                        <!-- Breadcrumbs -->
                        <Breadcrumb v-if="breadcrumbs && breadcrumbs.length > 0">
                            <BreadcrumbList>
                                <template v-for="(breadcrumb, index) in breadcrumbs" :key="index">
                                    <BreadcrumbItem :class="{ 'hidden md:block': index < breadcrumbs.length - 1 }">
                                        <BreadcrumbLink v-if="!breadcrumb.current && breadcrumb.href" :href="breadcrumb.href">
                                            {{ breadcrumb.label }}
                                        </BreadcrumbLink>
                                        <BreadcrumbPage v-else>
                                            {{ breadcrumb.label }}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator v-if="index < breadcrumbs.length - 1" :class="{ 'hidden md:block': true }" />
                                </template>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <!-- Default slot for custom header content -->
                        <slot name="header-actions" />
                    </div>
                </header>

                <!-- Page Header (optional) -->
                <div v-if="$slots.header" class="shrink-0 border-b border-zinc-900/5 bg-white">
                    <div class="px-4 py-6">
                        <slot name="header" />
                    </div>
                </div>

                <!-- Page Content - Scrollable Container -->
                <div class="flex-1 overflow-auto">
                    <slot />
                </div>
            </SidebarInset>
        </SidebarProvider>
    </div>
</template>
