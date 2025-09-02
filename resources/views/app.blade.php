<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://rsms.me/">
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css">

        <!-- Scripts -->
        @routes
        @vite(['resources/js/app.ts', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead
        <script>
            // Initialize theme from appearance composable
            (function() {
                const savedAppearance = localStorage.getItem('appearance');
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                
                if (savedAppearance === 'dark' || (savedAppearance === 'system' && systemPrefersDark) || (!savedAppearance && systemPrefersDark)) {
                    document.documentElement.classList.add('dark');
                } else if (savedAppearance === 'light' || (savedAppearance === 'system' && !systemPrefersDark)) {
                    document.documentElement.classList.remove('dark');
                }
            })();
        </script>
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
