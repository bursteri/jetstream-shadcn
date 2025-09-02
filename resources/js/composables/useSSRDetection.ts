import { ref, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';

export function useSSRDetection() {
    const isSSR = ref(false);
    const isSSREnabled = ref(false);
    const renderMode = ref<'SSR' | 'CSR' | 'HYDRATED'>('CSR');
    
    // Check if we're on the server
    if (typeof window === 'undefined') {
        isSSR.value = true;
        renderMode.value = 'SSR';
    }
    
    // Get SSR enabled flag from page props
    const page = usePage();
    isSSREnabled.value = (page.props.value as any)?.ssr || false;
    
    onMounted(() => {
        // Check meta tag to see if page was SSR rendered
        const ssrMeta = document.querySelector('meta[name="ssr-rendered"]');
        const wasSSRRendered = ssrMeta?.getAttribute('content') === 'true';
        
        // Determine render mode
        if (wasSSRRendered) {
            renderMode.value = 'HYDRATED';
            console.log('🚀 Page was server-side rendered and hydrated');
        } else {
            renderMode.value = 'CSR';
            console.log('💻 Page was client-side rendered');
        }
        
        // Log additional debug info
        console.log('SSR Details:', {
            ssrEnabledForRoute: isSSREnabled.value,
            wasSSRRendered,
            currentMode: renderMode.value,
            route: window.location.pathname
        });
    });
    
    return {
        isSSR,
        isSSREnabled,
        renderMode
    };
}