import { watchEffect } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';

export function useFlashMessages() {
    const page = usePage();

    watchEffect(() => {
        const flash = page.props.jetstream?.flash;
        
        if (!flash) return;
        
        // Handle banner messages
        if (flash.banner) {
            const style = flash.bannerStyle || 'success';
            
            if (style === 'success') {
                toast.success(flash.banner);
            } else if (style === 'danger') {
                toast.error(flash.banner);
            } else {
                toast(flash.banner);
            }
        }
        
        // Handle other flash message types if they exist
        if (flash.message) {
            toast(flash.message);
        }
        
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
    });
}