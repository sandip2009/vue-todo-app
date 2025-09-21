# Copilot Instructions for AI Agents

## Project Overview
- This is a Laravel + Vue.js monorepo for a Todo and Bookstore web application.
- Backend: Laravel (PHP) in the root directory, with models in `app/Models`, controllers in `app/Http/Controllers`, and API routes in `routes/api.php`.
- Frontend: Vue.js SPA located in `resources/js/`, with components in `resources/js/components/` and main entry in `resources/js/app.js`.

## Key Patterns & Structure
- Vue components are organized by feature (e.g., `TodoApp.vue`, `Bookstore.vue`, `Menu.vue`).
- The `Menu.vue` component controls which main view is active via `activeMenu` state.
- Laravel models (`Todo.php`, `Book.php`, `User.php`) map to database tables defined in `database/migrations/`.
- API endpoints are defined in `routes/api.php` and handled by controllers in `app/Http/Controllers/`.
- Blade templates for server-rendered views are in `resources/views/`.

## Developer Workflows
- **Install dependencies:**
  - PHP: `composer install`
  - JS: `npm install` or `yarn install`
- **Run development servers:**
  - Laravel: `php artisan serve`
  - Vite (Vue): `npm run dev`
- **Build for production:**
  - `npm run build`
- **Run tests:**
  - PHP: `php artisan test` or `vendor\bin\phpunit`

## Conventions & Integration
- Use Eloquent ORM for database access in Laravel models.
- Vue components communicate via props/events or shared state in parent components (see `Menu.vue`).
- API calls from Vue should target Laravel endpoints (e.g., `/api/todos`).
- Use `resources/js/components/` for all Vue components; register them in parent components as needed.
- Use migrations in `database/migrations/` for DB schema changes.

## Examples
- To add a new feature (e.g., Notes):
  1. Create a model in `app/Models/Note.php` and migration in `database/migrations/`.
  2. Add a controller in `app/Http/Controllers/` and define routes in `routes/api.php`.
  3. Add Vue components in `resources/js/components/` and update `Menu.vue` to include the new feature.

## References
- Main entry points: `resources/js/app.js` (Vue), `routes/api.php` (API), `app/Http/Controllers/` (backend logic)
- See `Menu.vue` for SPA navigation pattern.
- See `Book.php`, `Todo.php` for Eloquent model conventions.

---
Adapt instructions as the codebase evolves. Keep this file concise and actionable for future AI agents.