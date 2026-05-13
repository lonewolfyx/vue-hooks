# @lonewolfyx/vue-hooks

lonewolfyx's Collection of Vue Composition Utilities

## Features

- Fully typed with TypeScript
- Tree-shakable ESM & CJS dual format
- Zero dependencies (only `vue` as peer dependency)

## Install

```bash
pnpm install @lonewolfyx/vue-hooks
```

## Usage

```ts
import { createContext } from '@lonewolfyx/vue-hooks'

interface ThemeContext {
  dark: boolean
}

const [useTheme, provideTheme] = createContext<ThemeContext>('ThemeProvider')
```

```vue
<!-- Provider.vue -->
<script setup>
import { provideTheme } from './context'
provideTheme({ dark: true })
</script>

<!-- Child.vue -->
<script setup>
import { useTheme } from './context'
const theme = useTheme() // { dark: true }
</script>
```

More hooks and detailed documentation: [vue-hooks](https://vue-hooks.vercel.app)

## License

[MIT](./LICENSE) | Author: [@lonewolfyx](https://github.com/lonewolfyx)
