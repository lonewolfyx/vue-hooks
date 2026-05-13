# createContext

Creates a typed context for Vue 3, inspired by React's `createContext`. Returns a pair of `[useContext, provideContext]` functions that wrap Vue's `provide`/`inject` API with type safety and descriptive error messages.

## Usage

```ts
// context.ts
import { createContext } from '@lonewolfyx/vue-hooks'

interface ThemeContext {
    dark: boolean
}

export const [useTheme, provideTheme] = createContext<ThemeContext>('ThemeProvider')
```

### Provider Component

```vue
<!-- ThemeProvider.vue -->
<script setup lang="ts">
import { provideTheme } from './context'

provideTheme({ dark: true })
</script>

<template>
    <slot />
</template>
```

### Consumer Component

```vue
<!-- Child.vue -->
<script setup lang="ts">
import { useTheme } from './context'

const theme = useTheme()
// theme: { dark: true }
</script>

<template>
    <p>Dark mode: {{ theme.dark }}</p>
</template>
```

If `useTheme()` is called outside of a `ThemeProvider`, an error is thrown:

> Injection `Symbol(ThemeProviderContext)` not found. Component must be used within `ThemeProvider`

## API

```ts
function createContext<ContextValue>(
    providerComponentName: string | string[],
    contextName?: string,
): readonly [UseContext<ContextValue>, ProvideContext<ContextValue>]
```

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `providerComponentName` | `string \| string[]` | Name(s) of the providing component(s). Used in the error message when the context is missing. |
| `contextName` | `string` | Optional description for the internal injection key symbol. Auto-generated as `"<name>Context"` when omitted. |

### Return Value

A readonly tuple `[useContext, provideContext]`:

| Function | Signature | Description |
|---|---|---|
| `useContext` | `(fallback?) => ContextValue` | Injects the context value. Throws if no provider exists and no fallback is given. |
| `provideContext` | `(value) => ContextValue` | Provides the context value to descendant components. Returns the provided value. |

## Examples

### Fallback Value

```ts
const [useConfig] = createContext<Config>('ConfigProvider')

// No error thrown, returns the fallback when no provider exists
const config = useConfig({ theme: 'light' })
```

### Explicit `null` Context

```ts
const [useUser, provideUser] = createContext<UserInfo | null>('UserProvider')

// Provide null intentionally — the consumer receives null without error
provideUser(null)
const user = useUser() // null
```

### Multiple Provider Names

```ts
const [useLayout] = createContext<Layout>('LayoutProvider')

// Error message references both component names
const [useLayout2] = createContext<Layout>(['SidebarProvider', 'NavbarProvider'])
// Error: "...must be used within one of the following components: SidebarProvider, NavbarProvider"
```

### Custom Context Name

```ts
const [useTheme] = createContext<Theme>('ThemeProvider', 'AppTheme')
// Injection key symbol description is "AppTheme" instead of "ThemeProviderContext"
```

## TypeScript Types

```ts
type UseContext<ContextValue> = <T extends ContextValue | null | undefined = ContextValue>(
    fallback?: T,
) => T extends null ? ContextValue | null : ContextValue

type ProvideContext<ContextValue> = (contextValue: ContextValue) => ContextValue

type CreateContextReturn<ContextValue> = readonly [
    UseContext<ContextValue>,
    ProvideContext<ContextValue>,
]
```
