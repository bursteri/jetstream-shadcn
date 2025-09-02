import { createSSRApp, h, DefineComponent } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { createInertiaApp } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/src/js';
import type { Config } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

interface ZiggyPageProps {
    location: string;
    [key: string]: any;
}

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => {
            const pages = import.meta.glob<DefineComponent>('./Pages/**/*.vue');
            return resolvePageComponent(`./Pages/${name}.vue`, pages);
        },
        setup({ App, props, plugin }) {
            const ziggyProps = page.props.ziggy as ZiggyPageProps & Config;
            return createSSRApp({ render: () => h(App, props) })
                .use(plugin)
                .use(ZiggyVue, {
                    ...ziggyProps,
                    location: new URL(ziggyProps.location),
                });
        },
    })
);
