# Contributing

Thanks for your interest in contributing to `@lonewolfyx/vue-hooks`!

## Development Setup

1. Fork and clone the repository:

```bash
git clone https://github.com/lonewolfyx/vue-hooks.git
cd vue-hooks
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development build:

```bash
pnpm dev
```

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start the library in watch mode |
| `pnpm build` | Build the library |
| `pnpm test` | Run tests |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Run ESLint with auto-fix |
| `pnpm docs:dev` | Start the documentation dev server |
| `pnpm docs:build` | Build the documentation |

## Adding a New Hook

1. Create a new directory under `src/` (e.g., `src/my-hook/`)
2. Add your hook implementation and tests
3. Export from `src/index.ts`
4. Add documentation under `docs/hooks/`
5. Update `docs/.vitepress/config.ts` to include the new hook in the sidebar

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Commit messages are validated automatically.

Examples:

```
feat: add useToggle hook
fix: correct createContext fallback behavior
docs: update installation guide
test: add tests for createContext null handling
```

## Code Style

This project uses [@antfu/eslint-config](https://github.com/antfu/eslint-config) with:

- 4-space indentation
- Single quotes
- TypeScript enabled

Run `pnpm lint:fix` to auto-format your code.
