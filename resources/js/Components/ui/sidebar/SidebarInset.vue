<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();
</script>

<template>
    <main
        data-slot="sidebar-inset"
        :class="
            cn(
                'bg-background relative flex max-h-screen w-full flex-1 flex-col overflow-hidden border border-zinc-900/10 dark:border-zinc-800',
                'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:max-h-[calc(100vh-1rem)] md:peer-data-[variant=inset]:rounded-md md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0',
                props.class,
            )
        "
    >
        <slot />
    </main>
</template>
