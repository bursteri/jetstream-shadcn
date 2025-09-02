# Selective SSR (Server-Side Rendering) Implementation

This application now supports selective SSR, allowing you to enable server-side rendering only on specific pages while keeping other pages client-side rendered.

## How It Works

### 1. Middleware-Based Control
The `SelectiveSSR` middleware (`app/Http/Middleware/SelectiveSSR.php`) sets an attribute on the request to enable SSR for specific routes.

### 2. Configuration
The middleware is registered in `bootstrap/app.php` with the alias `ssr`, making it available for use in routes.

### 3. Template Logic
The `resources/views/app.blade.php` template checks for the SSR flag and renders accordingly:
- With SSR: Uses `@inertia` directive (server-rendered)
- Without SSR: Uses client-side mounting

## Usage

### Enable SSR on Specific Routes

Apply the `ssr` middleware to routes that need server-side rendering:

```php
// Single route with SSR
Route::middleware(['ssr'])->get('/landing', function () {
    return Inertia::render('Landing');
});

// Group of routes with SSR
Route::middleware(['ssr'])->group(function () {
    Route::get('/blog', [BlogController::class, 'index']);
    Route::get('/blog/{slug}', [BlogController::class, 'show']);
    Route::get('/products', [ProductController::class, 'index']);
});
```

### Routes Without SSR

Routes without the `ssr` middleware will be client-side rendered (default behavior):

```php
// These routes will be client-side rendered
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::get('/settings', [SettingsController::class, 'index']);
});
```

## When to Use SSR

### Use SSR for:
- **Public landing pages** - Better SEO and first-page load
- **Blog posts** - Search engine indexing and social media sharing
- **Product pages** - E-commerce SEO
- **Marketing pages** - Better performance metrics
- **Content-heavy pages** - Faster initial content paint

### Skip SSR for:
- **Authenticated areas** - Dashboard, admin panels
- **Interactive applications** - Real-time features, complex UI
- **User-specific content** - Profile pages, settings
- **Private data** - Reduces server load and complexity

## Benefits

1. **Selective Performance**: SSR only where it matters most
2. **Reduced Server Load**: Client-side rendering for interactive pages
3. **Better SEO**: Search engines can crawl SSR pages
4. **Flexibility**: Easy to enable/disable SSR per route
5. **Cost-Effective**: Lower server resources compared to full SSR

## Technical Details

- SSR pages are rendered using the `resources/js/ssr.ts` entry point
- The build process creates both client and SSR bundles (`npm run build`)
- The SSR flag is passed to all Inertia pages via shared props
- You can check if a page is SSR-rendered in Vue components:

```vue
<script setup>
import { usePage } from '@inertiajs/vue3'

const page = usePage()
const isSSR = page.props.ssr // true if SSR is enabled for this route
</script>
```

## Development

During development, both SSR and client-side rendering work with hot module replacement:

```bash
npm run dev
```

For production builds:

```bash
npm run build
```

This creates both the client bundle and SSR bundle as configured in `vite.config.ts`.