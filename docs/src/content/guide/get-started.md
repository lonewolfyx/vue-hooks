# Get Started

`@lonewolfyx/vue-hooks` is a collection of Vue 3 Composition API utilities designed to simplify common patterns. The library is fully typed with TypeScript, tree-shakable, and has zero dependencies beyond Vue itself.

::: tip Vue Version
`@lonewolfyx/vue-hooks` requires **Vue >= 3.3.0** as a peer dependency.
:::

## Install

```bash
pnpm add @lonewolfyx/vue-hooks
```

See the [Installation](./installation) page for more details.

## Quick Example

Create a typed context with `createContext`:

```ts
// context.ts
import { createContext } from '@lonewolfyx/vue-hooks'

interface ThemeContext {
    dark: boolean
}

export const [useTheme, provideTheme] = createContext<ThemeContext>('ThemeProvider')
```

Provide the context in a parent component:

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

Consume the context in a child component:

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

## Available Hooks

| Hook | Description |
|---|---|
| [createContext](../hooks/create-context) | Create a typed context with `provide` and `inject` helpers |
| [createReusableTemplate](../hooks/create-reusable-template) | Define a template once and reuse it multiple times with different bindings |
