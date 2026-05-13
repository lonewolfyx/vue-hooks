import type { InjectionKey } from 'vue'
import type { CreateContextReturn, ProvideContext, UseContext } from '@/types.ts'
import { inject, provide } from 'vue'

/**
 * Creates a typed context for Vue 3, similar to React's createContext.
 * Returns a pair of `[useContext, provideContext]` functions.
 *
 * @param providerComponentName - The name(s) of the component(s) providing the context.
 * @param contextName - Optional description for the injection key symbol.
 *
 * @example
 * ```ts
 * // context.ts
 * import { createContext } from '@lonewolfyx/vue-hooks'
 *
 * interface ThemeContext { dark: boolean }
 * export const [useTheme, provideTheme] = createContext<ThemeContext>('ThemeProvider')
 *
 * // Provider.vue
 * import { provideTheme } from './context'
 * provideTheme({ dark: true })
 *
 * // Child.vue
 * import { useTheme } from './context'
 * const theme = useTheme() // { dark: true }
 * ```
 */
export function createContext<ContextValue>(
    providerComponentName: string | string[],
    contextName?: string,
): CreateContextReturn<ContextValue> {
    const symbolDescription
        = typeof providerComponentName === 'string' && !contextName
            ? `${providerComponentName}Context`
            : contextName

    const injectionKey: InjectionKey<ContextValue | null> = Symbol(symbolDescription)

    const injectContext: UseContext<ContextValue> = <T extends ContextValue | null | undefined = ContextValue>(
        fallback?: T,
    ): T extends null ? ContextValue | null : ContextValue => {
        const context = inject(injectionKey, fallback)
        if (context)
            return context

        if (context === null)
            return context as any

        throw new Error(
            `Injection \`${injectionKey.toString()}\` not found. Component must be used within ${
                Array.isArray(providerComponentName)
                    ? `one of the following components: ${providerComponentName.join(', ')}`
                    : `\`${providerComponentName}\``
            }`,
        )
    }

    const provideContext: ProvideContext<ContextValue> = (contextValue: ContextValue) => {
        provide(injectionKey, contextValue)
        return contextValue
    }

    return [injectContext, provideContext] as const
}
