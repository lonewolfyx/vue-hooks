# createReusableTemplate

Creates a pair of components for defining a reusable template once and replaying it multiple times in the same parent template. It returns `[DefineTemplate, UseTemplate]`.

`DefineTemplate` stores a slot render function, and `UseTemplate` invokes that slot again with its current props, attrs, and listeners exposed as slot bindings.

## Usage

```vue
<template>
    <DefineTemplate v-slot="{ title, onFoo }">
        <div>
            <div>{{ title }}</div>
            <button @click="onFoo?.(123)">
                trigger
            </button>
        </div>
    </DefineTemplate>

    <UseTemplate title="header" :onFoo="console.log" />
    <UseTemplate :onFoo="console.log" />
</template>

<script setup lang="ts">
import { createReusableTemplate } from '@lonewolfyx/vue-hooks'

const [DefineTemplate, UseTemplate] = createReusableTemplate<{
    title?: string
    onFoo?: (value: number) => void
}>()
</script>
```

## API

```ts
function createReusableTemplate<Bindings extends Record<string, any> = Record<string, any>>(): readonly [
    DefineTemplateComponent<Bindings>,
    UseTemplateComponent<Bindings>,
]
```

### Type Parameters

| Type | Description |
|---|---|
| `Bindings` | The slot binding shape exposed by `UseTemplate` to `DefineTemplate`. |

### Return Value

A readonly tuple `[DefineTemplate, UseTemplate]`:

| Component | Description |
|---|---|
| `DefineTemplate` | Captures a default slot and exposes `UseTemplate` bindings through `v-slot`. |
| `UseTemplate` | Reuses the captured template and passes current attrs/listeners into the slot scope. |

## Notes

- `UseTemplate` exposes incoming listeners as slot bindings like `onFoo`, so `@foo="handler"` can be consumed inside the reusable template as `onFoo`.
- If `UseTemplate` is rendered before `DefineTemplate`, nothing is rendered until a template is defined.
- For the best type inference, provide a `Bindings` generic when your reusable template expects named props or callbacks.
