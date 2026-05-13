# @lonewolfyx/vue-hooks

A collection of essential Vue 3 Composition API hooks, inspired by React's ecosystem patterns.

## Features

- Fully typed with TypeScript
- Tree-shakable ESM and CJS dual format
- Zero dependencies (only `vue` as peer dependency)
- Tested with Vitest

## Installation

```bash
npm install @lonewolfyx/vue-hooks
# or
pnpm add @lonewolfyx/vue-hooks
# or
yarn add @lonewolfyx/vue-hooks
```

**Peer dependency:** `vue >= 3.3.0`

## Hooks

### `createContext`

Creates a typed context for Vue 3, similar to React's `createContext`. Internally wraps Vue's `provide` / `inject` API with full type safety and better developer experience.

**Signature:**

```ts
function createContext<ContextValue>(
  providerComponentName: string | string[],
  contextName?: string,
): [UseContext<ContextValue>, ProvideContext<ContextValue>]
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `providerComponentName` | `string \| string[]` | Name(s) of the providing component(s), used in error messages |
| `contextName` | `string` (optional) | Custom description for the injection key symbol |

**Returns:** A readonly tuple of `[useContext, provideContext]`.

#### Basic Usage

```ts
// context.ts
import { createContext } from '@lonewolfyx/vue-hooks'

interface ThemeContext {
  dark: boolean
}

export const [useTheme, provideTheme] = createContext<ThemeContext>('ThemeProvider')
```

```vue
<!-- Provider.vue -->
<script setup lang="ts">
import { provideTheme } from './context'

provideTheme({ dark: true })
</script>

<template>
  <slot />
</template>
```

```vue
<!-- Child.vue -->
<script setup lang="ts">
import { useTheme } from './context'

const theme = useTheme() // { dark: true }
</script>

<template>
  <div>{{ theme.dark }}</div>
</template>
```

#### With Fallback Value

```ts
const theme = useTheme({ dark: false }) // Returns fallback if no provider exists
```

#### Passing `null`

```ts
const [use, provide] = createContext<string | null>('NullProvider')

provide(null) // Explicitly provide null
const value = use() // Returns null

const fallbackNull = use(null) // Returns null as fallback
```

#### Multiple Provider Names

When multiple components can provide the same context, pass an array for clearer error messages:

```ts
const [useAuth, provideAuth] = createContext<AuthState>(['AdminLayout', 'UserLayout'])
// Error: "Injection `AdminLayoutContext` not found. Component must be used within one of the following components: AdminLayout, UserLayout"
```

#### Custom Context Name

```ts
const [useAuth, provideAuth] = createContext<AuthState>('AuthProvider', 'AuthenticationContext')
// Symbol description will be "AuthenticationContext" instead of "AuthProviderContext"
```

## Development

```bash
# Install dependencies
pnpm install

# Start dev mode (watch)
pnpm dev

# Build
pnpm build

# Run tests
pnpm test

# Lint
pnpm lint
```

## License

[MIT](./LICENSE)
