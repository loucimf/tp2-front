# TP2

### Runtime

El entrypoint es `frontend/src/main.tsx`.

`frontend/src/App.tsx` no usa router. Maneja navegación interna con estado local:

- `explore`
- `library`
- `trending`
- `offers`

Hoy solo hay dos vistas efectivas:

- `ExplorePage`
- `LibraryPage`

Si no hay sesión, renderiza `CredentialPage`.

### Auth

`frontend/src/hooks/useAuth.ts` centraliza:

- `signUp`
- `signInWithPassword`
- `signOut`
- bootstrap de sesión con `supabase.auth.getSession()`
- sincronización con `onAuthStateChange`

Cliente Supabase:
- `frontend/src/lib/supabase.ts`

### Explore

Flujo:

1. `ExplorePage` usa `useExploreGames`.
2. `useExploreGames` usa `useGames`.
3. `useGames` consume `GamesAPI`.
4. `GamesAPI` llama al backend en `/games`.

Responsabilidades:

- paginación
- ordenamiento local por opción (`newest`, `popular`, `score`)
- filtro local por género y búsqueda
- marcado local de juegos agregados a biblioteca

Alta en biblioteca:

- `ExplorePage` usa `UserAPI.addGameToLibrary()`
- endpoint backend: `PUT /api/user-games/library`

### Library

Flujo:

1. `LibraryPage` usa `useLibraryGames`.
2. `useLibraryGames` carga en paralelo:
   - biblioteca del usuario
   - categorías personalizadas
3. por cada juego guardado, pide detalles a RAWG para obtener `background_image`

Responsabilidades:

- búsqueda local
- filtro por categoría
- orden local (`recent`, `popular`, `title`)
- creación de categorías
- actualización de categoría de un juego

APIs consumidas:

- `GET /api/user-games/library`
- `PUT /api/user-games/library`
- `DELETE /api/user-games/library`
- `GET /api/user-games/categories`
- `POST /api/user-games/categories`
- `GET /api/games/:gameId`

### Configuración de API

Archivo:

- `frontend/src/api/global.api.ts`

Resolución actual:

- `VITE_API_URL` si está definido
- en dev: `http://localhost:3001/api`
- en prod: hoy `VERCEL_PROD` está vacío, así que en despliegue conviene definir `VITE_API_URL`

## Backend

Stack:

- Express 5
- TypeScript
- Supabase JS
- `dotenv`

### Runtime

Archivos principales:

- `backend/src/app.ts`: app Express, CORS manual, JSON middleware, `/health`, montaje de `/api`
- `backend/src/server.ts`: arranque local con `listen`
- `backend/index.ts`: adapter para Vercel exportando `app`
- `backend/vercel.json`: rewrite a `index.ts`

### Variables de entorno

Se cargan en `backend/src/env.ts` con:

- `.env.local`
- fallback a `.env`

Variables usadas por código:

- `PORT`
- `ALLOWED_ORIGINS`
- `RAWG_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Observación:

- `ENVIRONMENT` está hardcodeado en `"development"`.
- El cliente Supabase del backend usa `SUPABASE_SECRET_KEY`, no `SUPABASE_SERVICE_ROLE_KEY`, aunque este último también se resuelve en `env.ts`.

### CORS

Implementación manual en `backend/src/app.ts`.

Comportamiento:

- en `development`: `Access-Control-Allow-Origin: *`
- además permite origins explícitos desde `ALLOWED_ORIGINS`
- responde `OPTIONS` con `204`

### Supabase

Cliente:

- `backend/src/db/supabase.ts`

Uso actual:

- validar bearer token en `require-auth`
- persistencia de `user_games`
- persistencia de `user_categories`

### Rutas

Base:

- `/health`
- `/api`

Montaje:

- `/api/profiles`
- `/api/games`
- `/api/user-games`

#### `/api/games`

Archivo:

- `backend/src/routes/games.routes.ts`

Endpoints:

- `GET /api/games`
- `GET /api/games/:gameId`

Responsabilidad:

- proxy simple a RAWG
- pasa `page`, `page_size`, `ordering`

#### `/api/user-games`

Archivo:

- `backend/src/routes/user.routes.ts`

Endpoints:

- `GET /api/user-games/library`
- `PUT /api/user-games/library`
- `DELETE /api/user-games/library`
- `GET /api/user-games/library/example`
- `GET /api/user-games/categories`
- `POST /api/user-games/categories`

Notas de implementación:

- el `userId` se toma del bearer token si existe, o de `body/query`
- las rutas no están protegidas globalmente por `requireAuth`
- `PUT /library` hace upsert por `user_id + game_api_id`
- si llega `title`, inserta o actualiza el juego
- si no llega `title`, intenta actualizar solo `price`/`category_id`

#### `/api/profiles`

Archivo:
- `backend/src/routes/profile.routes.ts`

### Modelos y repositorios

Modelos:

- `backend/src/models/profile.model.ts`
- `backend/src/models/user-game.model.ts`
- `backend/src/models/user-categories.model.ts`

Repositorios:

- `backend/src/repositories/user-games.repository.ts`
- `backend/src/repositories/user-categories.repository.ts`
## Esquema de datos asumido por el código
### `user_games`

- `id`
- `user_id`
- `game_api_id`
- `title`
- `release_date`
- `price`
- `category_id`
- `created_at`

### `user_categories`

- `id`
- `user_id`
- `title`
- `created_at`

`profiles` existe a nivel de modelos/ruta, pero todavía no tiene repositorio ni operaciones reales.

## Deploy

Frontend:

- pensado para Vite/Vercel
- requiere `VITE_API_URL` en producción

Backend:

- deploy: Vercel
- mantiene estructura clásica de Express
- Vercel entra por `backend/index.ts`

## Estado actual

Implementado:

- auth con Supabase en frontend
- exploración de catálogo desde RAWG vía backend
- agregado de juegos a biblioteca
- categorías personalizadas de usuario
- asignación de categoría a juegos

Pendiente o incompleto:

- limpieza de archivos legacy no usados como `frontend/src/hooks/useLibrary.ts`
