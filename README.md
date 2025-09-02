# Laravel Jetstream + Shadcn/UI Starter Kit

A modern Laravel starter kit combining Jetstream's authentication scaffolding with the beautiful Shadcn/UI component library for Vue.js.

## Features

- 🔐 **Full Authentication System** - Registration, login, password reset, email verification
- 🌐 **Social Authentication (Socialstream)** - Login with GitHub, Google, Facebook, LinkedIn, Twitter, and more
- 👥 **Team Management** - Create and manage teams with role-based permissions
- 🎨 **Shadcn/UI Components** - Modern, accessible UI components built with Radix Vue and Tailwind CSS
- ⚡ **Vue 3 + Inertia.js** - SPA-like experience with server-side routing
- 🎯 **TypeScript Ready** - Full TypeScript support for better developer experience
- 🌙 **Dark Mode Support** - Built-in dark mode toggle
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS

## Requirements

- PHP 8.1+
- Node.js 18+
- Composer
- MySQL/PostgreSQL/SQLite

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/jetstream-shadcn.git
   cd jetstream-shadcn
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure your database**
   
   Update your `.env` file with your database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

6. **Run migrations**
   ```bash
   php artisan migrate
   ```

7. **Build assets**
   ```bash
   npm run build
   ```

8. **Start the development server**
   ```bash
   # In one terminal
   php artisan serve
   
   # In another terminal (for hot reload)
   npm run dev
   ```

   Visit `http://localhost:8000` to see your application.

## Project Structure

```
├── app/                    # Laravel application files
├── resources/
│   ├── js/
│   │   ├── Components/     # Reusable Vue components
│   │   │   └── ui/        # Shadcn/UI components
│   │   ├── Layouts/       # Application layouts
│   │   ├── Pages/         # Inertia.js page components
│   │   └── lib/           # Utilities and helpers
│   └── css/               # Stylesheets
├── routes/                # Application routes
└── database/              # Migrations and seeders
```

## Using Shadcn/UI Components

This starter kit includes pre-configured Shadcn/UI components. Here's how to use them:

### Example: Using a Button

```vue
<template>
  <Button @click="handleClick" variant="default">
    Click me
  </Button>
</template>

<script setup lang="ts">
import { Button } from '@/Components/ui/button'

const handleClick = () => {
  console.log('Button clicked!')
}
</script>
```

### Available Components

- **Button** - Various button styles and sizes
- **Card** - Container components with header, content, and footer
- **Dialog** - Modal dialogs for user interactions
- **Dropdown Menu** - Context menus and dropdowns
- **Input** - Form input fields
- **Label** - Form labels
- **Checkbox** - Checkbox inputs
- **Switch** - Toggle switches
- **Avatar** - User avatars
- **Badge** - Status indicators and labels
- **Alert** - Alert messages and notifications

### Adding New Shadcn/UI Components

To add more Shadcn/UI components:

1. Visit [Shadcn/Vue](https://www.shadcn-vue.com/docs/components)
2. Choose a component
3. Copy the component code
4. Create a new file in `resources/js/Components/ui/`
5. Import and use in your Vue components

## Authentication Features

### Registration & Login
- User registration with email verification
- Secure login with remember me option
- Password reset functionality
- Two-factor authentication (optional)

### Social Authentication (Socialstream)
This starter kit includes [Socialstream](https://docs.socialstream.dev) for social authentication:

- **OAuth Providers Supported:**
  - GitHub
  - Google
  - Facebook
  - LinkedIn
  - Twitter/X
  - GitLab
  - Bitbucket
  - Slack

- **Features:**
  - Link multiple social accounts to one user
  - Manage connected accounts from profile settings
  - Generate provider avatars
  - Remember session logins
  - Refresh OAuth tokens

#### Configuring Social Providers

1. Add your OAuth app credentials to `.env`:
   ```env
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GITHUB_REDIRECT_URI=http://localhost:8000/oauth/github/callback

   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REDIRECT_URI=http://localhost:8000/oauth/google/callback
   
   # Add other providers as needed
   ```

2. Enable/disable providers in `config/socialstream.php`:
   ```php
   'providers' => [
       'github',
       'google',
       // 'facebook',
       // 'linkedin',
       // Add or remove as needed
   ],
   ```

3. Configure OAuth apps:
   - **GitHub**: [Create OAuth App](https://github.com/settings/developers)
   - **Google**: [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - **Facebook**: [Facebook Developers](https://developers.facebook.com/apps)
   - **LinkedIn**: [LinkedIn Developers](https://www.linkedin.com/developers/apps)

### Teams (if enabled)
- Create and manage teams
- Invite team members
- Assign roles and permissions
- Switch between teams

## Customization

### Tailwind CSS v4 Configuration
This project uses Tailwind CSS v4, which uses CSS-based configuration instead of JavaScript config files. Customize your design system directly in `resources/css/app.css` using CSS variables and Tailwind's new CSS-first configuration approach.

### Theme Customization
Update CSS variables and Tailwind theme in `resources/css/app.css`:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... other variables */
}
```

### Adding New Pages
Create a new Inertia page:

1. Create a Vue component in `resources/js/Pages/`
2. Add a route in `routes/web.php`
3. Return an Inertia response from your controller

```php
// routes/web.php
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
});
```

## Production Deployment

1. **Build assets for production**
   ```bash
   npm run build
   ```

2. **Optimize Laravel**
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

3. **Set environment to production**
   ```env
   APP_ENV=production
   APP_DEBUG=false
   ```

4. **Configure your web server** (Nginx/Apache) to point to the `public` directory

## Common Commands

```bash
# Development
npm run dev              # Start Vite dev server
php artisan serve        # Start Laravel dev server

# Building
npm run build           # Build for production

# Database
php artisan migrate     # Run migrations
php artisan migrate:fresh --seed  # Fresh migration with seeders

# Cache
php artisan cache:clear  # Clear application cache
php artisan config:clear # Clear config cache
php artisan view:clear   # Clear view cache

# Testing
php artisan test        # Run PHP tests
npm run test           # Run JavaScript tests (if configured)
```

## Troubleshooting

### NPM Install Issues
If you encounter issues with npm install:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Permission Issues
```bash
chmod -R 755 storage bootstrap/cache
```

### Database Connection Issues
- Verify database credentials in `.env`
- Ensure database server is running
- Check if database exists

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-sourced software licensed under the [MIT license](LICENSE).

## Support

For issues and questions:
- Create an issue on GitHub
- Check the [Laravel documentation](https://laravel.com/docs)
- Visit [Shadcn/Vue documentation](https://www.shadcn-vue.com)

## Credits

- [Laravel](https://laravel.com)
- [Laravel Jetstream](https://jetstream.laravel.com)
- [Socialstream](https://socialstream.dev) - Social authentication for Laravel
- [Shadcn/UI](https://ui.shadcn.com)
- [Shadcn/Vue](https://www.shadcn-vue.com)
- [Vue.js](https://vuejs.org)
- [Inertia.js](https://inertiajs.com)
- [Tailwind CSS](https://tailwindcss.com)