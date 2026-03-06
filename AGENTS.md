# AGENTS.md

Agent guide for `tbs-front` (React + TypeScript + Vite).

## 1) Project snapshot

- Package manager: `npm` (`package-lock.json` is present).
- App type: client-side React 19 app built with Vite 7.
- Language: TypeScript (`strict` mode enabled).
- Styling: Tailwind CSS + PostCSS + utility classes in JSX.
- Data layer: TanStack Query for server state, Zustand for client state.
- HTTP client: Axios with a request interceptor in `src/components/config/axios.ts`.
- Router: `react-router-dom` with protected routes + lazy-loaded pages.

## 2) Source layout (high-value folders)

- `src/main.tsx`: app bootstrap + QueryClientProvider.
- `src/components/App.tsx`: top-level routes and lazy page wiring.
- `src/components/pages/`: route-level page components.
- `src/components/common/`: reusable UI components.
- `src/components/layout/`: shared layout primitives.
- `src/components/hooks/`: custom hooks (`useTrips`, `useFinance`, etc.).
- `src/components/services/`: API calls grouped by domain.
- `src/components/store/`: Zustand stores.
- `src/components/types/types.d.ts`: shared domain and API types.
- `src/components/config/`: axios setup, route guards, layout guards.
- `src/components/utils/`: pure utility helpers.

## 3) Install and run commands

- Install deps: `npm install`
- Dev server (default dev mode): `npm run dev`
- Dev server (explicit dev mode): `npm run dev:dev`
- Dev server (prod env mode): `npm run dev:prod`
- Build (type-check + bundle): `npm run build`
- Preview built app: `npm run preview`
- Lint full repo: `npm run lint`

## 4) Lint and static checks

- ESLint is configured via `eslint.config.js` and runs on `*.ts` + `*.tsx`.
- TS compiler strictness lives in `tsconfig.app.json` and `tsconfig.node.json`.
- Useful targeted checks:
  - Lint one file: `npx eslint src/components/hooks/useTrips.ts`
  - Lint one folder: `npx eslint src/components/services`
  - Type-check app only: `npx tsc -p tsconfig.app.json --noEmit`
  - Type-check node config only: `npx tsc -p tsconfig.node.json --noEmit`

## 5) Test commands (current state + single-test guidance)

- Current state: there is no test runner configured in `package.json`.
- There are no `test`, `test:watch`, or `test:ci` scripts yet.
- There are currently no `*.test.*` or `*.spec.*` files in the repo.

### What to run today

- Use quality gate sequence:
  1. `npm run lint`
  2. `npm run build`
  3. `npm run preview` (manual smoke test in browser)

### Single test execution

- Not available right now because no test framework is installed.
- If you add Vitest later, define scripts and use:
  - Run one test file: `npx vitest run src/path/to/file.test.ts`
  - Run one test by name: `npx vitest run -t "test name"`

## 6) Required coding conventions for agents

Follow existing repository patterns first. Do not introduce new frameworks or major structure changes without a clear reason.

### 6.1 TypeScript and typing

- Keep `strict`-safe code; avoid bypassing with `any`.
- Prefer explicit domain types from `src/components/types/types.d.ts`.
- Use `import type { ... }` for type-only imports.
- Type API return values in services (existing pattern uses `Promise<...>`).
- Keep nullable behavior explicit (`string | null`, `number | null`, etc.).
- Do not disable compiler rules in tsconfig or inline unless absolutely required.

### 6.2 Imports and module boundaries

- Use relative imports (current repo style); no path aliases are configured.
- Prefer grouping imports as:
  1. external packages,
  2. internal modules,
  3. type-only imports.
- Keep one concern per module:
  - API calls in `services/`
  - state in `store/`
  - fetch/mutation orchestration in `hooks/`
  - rendering in components/pages

### 6.3 Naming conventions

- Components/pages/providers/layouts: PascalCase file and symbol names.
- Hooks: `useXxx` naming (`useTrips`, `useToken`, etc.).
- Stores: camelCase exported store symbol with `Store` suffix (`tripsStore`).
- Service files: domain + `.services.ts` suffix (match existing style).
- Utility functions: descriptive verb phrases (`decodeToken`, `formattedAmount`).
- Query keys: stable array keys (`["trips", ...]`, `["trip", id]`).

### 6.4 React and state patterns

- Use functional components and hooks only.
- Keep route-level lazy loading in `App.tsx` for pages.
- Preserve auth gate flow (`ProtectedRoutes` + `ProtectedLayout`).
- Use TanStack Query for async server data and cache invalidation.
- Use Zustand for UI/session state that is not server-owned.
- Keep side effects in hooks/providers, not in presentational components.

### 6.5 Error handling and logging

- Service-layer errors should be propagated (`throw error`) after optional logging.
- Avoid swallowing errors silently; return fallback values only when intentional.
- Prefer user-facing feedback for mutation outcomes (existing: `sonner` toasts).
- Keep logs actionable and concise; avoid noisy debug logs in finalized code.
- Handle loading states and empty states explicitly in route/content components.

### 6.6 Formatting and style

- Match existing formatting in touched files (quotes/semicolons/line breaks).
- Keep functions focused and short; extract helpers when logic grows.
- Avoid adding comments for obvious code; comment only non-obvious intent.
- Keep Tailwind class lists readable and avoid unnecessary duplication.
- Preserve language consistency in user-facing copy within the same feature.

## 7) API and auth guardrails

- Base URL comes from `VITE_API_URL`; do not hardcode API hosts.
- Reuse shared Axios instance from `src/components/config/axios.ts`.
- Keep token refresh behavior centralized in the interceptor.
- Do not duplicate auth parsing logic across multiple components.
- Keep session storage keys consistent (`user`, `token`).

## 8) Change management expectations for agents

- Make minimal, focused diffs tied to the requested task.
- Do not refactor unrelated files in the same change.
- If you touch shared types, verify dependent hooks/services still type-check.
- Run `npm run lint` and `npm run build` before finishing when possible.
- If commands cannot run locally, clearly state what was not verified.

## 9) Cursor and Copilot rule files

- Checked `.cursor/rules/`: not present.
- Checked `.cursorrules`: not present.
- Checked `.github/copilot-instructions.md`: not present.
- Conclusion: no additional Cursor/Copilot repository rules currently apply.

## 10) Quick agent checklist

- Confirm scope and locate target module(s).
- Implement smallest safe change following folder responsibilities.
- Keep type safety and query/store patterns aligned with existing code.
- Validate with lint/build (and tests if introduced later).
- Report what changed, where, and what verification was run.
