<script setup lang="ts">
import { useSSRDetection } from '@/composables/useSSRDetection';

const { renderMode, isSSREnabled } = useSSRDetection();

const props = withDefaults(defineProps<{
    showInProduction?: boolean;
}>(), {
    showInProduction: false
});

// Only show in development unless explicitly enabled
const isDev = import.meta.env.DEV;
const shouldShow = isDev || props.showInProduction;
</script>

<template>
    <div v-if="shouldShow" class="fixed bottom-4 right-4 z-50">
        <div 
            class="rounded-lg px-3 py-2 text-xs font-medium shadow-lg backdrop-blur-sm transition-all"
            :class="{
                'bg-green-500/90 text-white': renderMode === 'HYDRATED',
                'bg-blue-500/90 text-white': renderMode === 'CSR',
                'bg-yellow-500/90 text-white': renderMode === 'SSR'
            }"
        >
            <div class="flex items-center gap-2">
                <span class="relative flex h-2 w-2">
                    <span 
                        class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                        :class="{
                            'bg-white': true
                        }"
                    ></span>
                    <span 
                        class="relative inline-flex h-2 w-2 rounded-full"
                        :class="{
                            'bg-white': true
                        }"
                    ></span>
                </span>
                <div>
                    <div class="font-semibold">
                        {{ renderMode === 'HYDRATED' ? 'SSR + Hydrated' : renderMode === 'CSR' ? 'Client Rendered' : 'Server Rendering' }}
                    </div>
                    <div class="opacity-90">
                        Route SSR: {{ isSSREnabled ? 'Enabled' : 'Disabled' }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>