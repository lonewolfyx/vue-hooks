import type {
    CreateReusableTemplateReturn,
    DefineTemplateComponent,
    UseTemplateComponent,
} from '@/types.ts'
import { defineComponent, onUnmounted, shallowRef } from 'vue'

/**
 * Creates a pair of components for defining and reusing a template in-place.
 *
 * `DefineTemplate` captures a slot render function once, and `UseTemplate`
 * replays that same slot with the current attrs/listeners exposed as bindings.
 *
 * @example
 * ```vue
 * <template>
 *   <DefineTemplate v-slot="{ title, onFoo }">
 *     <div>
 *       <div>{{ title }}</div>
 *       <button @click="onFoo?.(123)">emit</button>
 *     </div>
 *   </DefineTemplate>
 *
 *   <UseTemplate title="header" :onFoo="console.log" />
 * </template>
 *
 * <script setup lang="ts">
 * const [DefineTemplate, UseTemplate] = createReusableTemplate<{
 *   title?: string
 *   onFoo?: (value: number) => void
 * }>()
 * </script>
 * ```
 */
export function createReusableTemplate<
    Bindings extends Record<string, any> = Record<string, any>,
>(): CreateReusableTemplateReturn<Bindings> {
    const reusableTemplate = shallowRef<((bindings: Bindings) => any) | undefined>()

    const DefineTemplate = defineComponent({
        name: 'DefineTemplate',
        setup(_, { slots }) {
            onUnmounted(() => {
                if (reusableTemplate.value === slots.default)
                    reusableTemplate.value = undefined
            })

            return () => {
                reusableTemplate.value = slots.default as typeof reusableTemplate.value
                return null
            }
        },
    }) as DefineTemplateComponent<Bindings>

    const UseTemplate = defineComponent({
        name: 'UseTemplate',
        inheritAttrs: false,
        setup(_, { attrs }) {
            return () => reusableTemplate.value?.(attrs as Bindings) ?? null
        },
    }) as UseTemplateComponent<Bindings>

    return [DefineTemplate, UseTemplate] as const
}
