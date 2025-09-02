import { watchEffect, nextTick } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';

export function useFlashMessages() {
    const page = usePage();

    watchEffect(async () => {
        const flash = page.props.flash;
        
        if (!flash) return;
        
        // Wait for next tick to ensure DOM is ready
        await nextTick();
        
        // Handle each flash message type
        if (flash.success) {
            toast.success(flash.success);
        }
        
        if (flash.error) {
            toast.error(flash.error);
        }
        
        if (flash.warning) {
            toast.warning(flash.warning);
        }
        
        if (flash.info) {
            toast.info(flash.info);
        }
        
        if (flash.message) {
            toast(flash.message);
        }
    });
}