# AGENTS.md

## Stack

- Laravel 13 + Inertia 3 + React 19 + TailwindCSS 4 + TypeScript 6
- **Auth**: Laravel Fortify (login, register, 2FA, passkeys) — no custom auth controllers needed
- **Real-time**: Laravel Echo + Reverb (configured in `resources/js/app.tsx`)
- **Testing**: Pest 4 (SQLite in-memory, `RefreshDatabase`)
- **Frontend UI**: shadcn/ui New York style (`@/components/ui/`)
- **Icons**: lucide-react

## Key Commands

| Action | Command |
|--------|---------|
| Dev server | `composer run dev` (serves PHP + queue + Vite concurrently) |
| Frontend build | `yarn build` |
| Run all tests | `php artisan test --compact` |
| Single test file | `php artisan test --compact --filter=testName` or `tests/path/to/Test.php` |
| Lint PHP | `vendor/bin/pint --format agent` |
| Lint JS/TS | `yarn lint` (fix) / `yarn lint:check` |
| Format JS/TS | `yarn format` (fix) / `yarn format:check` |
| Type check | `yarn types:check` |
| Full CI check | `composer run ci:check` (lint + format + types + test) |
| Create a test | `php artisan make:test --pest SomeFeatureTest` |
| Create a model + factory + seeder | `php artisan make:model -mf --all ModelName` |

Always run `vendor/bin/pint --format agent` after editing PHP files.

## Architecture

- **Routes**: `routes/web.php` requires `auth.php`, `settings.php`, `admin.php`, `welcome.php`
- **Admin**: all routes under `/admin` prefix with `auth`, `verified`, `auth.admin` middleware
- **Public site**: routes in `routes/welcome.php` (home/about/categories/programs/products/articles/contact)
- **Controllers**: `App\Http\Controllers\Admin\*`, `App\Http\Controllers\Home\*`, `App\Http\Controllers\Settings\*`, `App\Http\Controllers\Auth\*`
- **Models**: two domains — `App\Models\Core` (User, Role, Permission, Region) and `App\Models\Company` (Category, Product, Program, Mitra, Slider, Review, Testimonial, Gallery, Location)
- **Frontend entry**: `resources/js/app.tsx` — auto-layout logic picks `AppLayout`, `AuthLayout`, `SettingsLayout`, `HomeLayout`, or `null` (welcome)
- **Wayfinder** generates TS route helpers: import from `@/routes/` (named routes) or `@/actions/` (controller actions)
- **Skills** in `.claude/skills/` — activate the matching skill before working in a domain (fortify, inertia-react, pest-testing, echo, wayfinder, tailwindcss, etc.)

## Conventions

- Use `Inertia::render()` for pages (no Blade views)
- Use Inertia v3 APIs: `Inertia::optional()` (not `lazy()`), `useHttp` for standalone requests, `router.cancelAll()` (not `.cancel()`)
- Built-in XHR client is preferred; Axios still available for non-Inertia requests
- Use curly braces for all control structures (PHP + JS)
- PHP: constructor property promotion, explicit return types, PHPDoc for complex logic, array-shape annotations
- TS/JS: `@/` path alias maps to `resources/js/`
- ESLint enforces `consistent-type-imports` with `prefer-top-level` specifier style
- Prettier: single quotes, 4-space indent (2-space for YAML), `prettier-plugin-tailwindcss` sorts classes
- Tests are mandatory for every change (Pest feature tests preferred)
- Alpine: posts imported from `yatimmandiri.org` WordPress JSON API (`NEWS_API_POSTS_URL` env var)
- Broadcasting uses Reverb (configured via `config/reverb.php`)
