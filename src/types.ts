import type {
    AllowedComponentProps,
    ComponentCustomProps,
    VNodeProps,
} from 'vue'

/**
 * Function returned by `createContext` to inject the context value.
 * @param fallback - Optional fallback value if context is not provided.
 * @returns The injected context value.
 * @throws When context injection failed and no fallback is specified.
 */
export type UseContext<ContextValue> = <
    T extends ContextValue | null | undefined = ContextValue,
>(
    fallback?: T,
) => T extends null ? ContextValue | null : ContextValue

/**
 * Function returned by `createContext` to provide the context value.
 * @param contextValue - The value to provide to descendant components.
 * @returns The provided context value.
 */
export type ProvideContext<ContextValue> = (contextValue: ContextValue) => ContextValue

/**
 * Return type of `createContext`: a readonly tuple of `[useContext, provideContext]`.
 */
export type CreateContextReturn<ContextValue> = readonly [
    UseContext<ContextValue>,
    ProvideContext<ContextValue>,
]

/**
 * Component returned by `createReusableTemplate` for defining the reusable template.
 * The default slot receives the bindings passed from `UseTemplate`.
 */
export type DefineTemplateComponent<Bindings extends Record<string, any>> = new () => {
    $slots: {
        default?: (bindings: Bindings) => any
    }
}

/**
 * Component returned by `createReusableTemplate` for reusing a previously defined template.
 * All incoming props, attrs, and listeners are exposed to the template slot as bindings.
 */
export type UseTemplateComponent<Bindings extends Record<string, any>> = new () => {
    $props: Bindings & AllowedComponentProps & ComponentCustomProps & VNodeProps
}

/**
 * Return type of `createReusableTemplate`: a readonly tuple of
 * `[DefineTemplate, UseTemplate]`.
 */
export type CreateReusableTemplateReturn<Bindings extends Record<string, any>> = readonly [
    DefineTemplateComponent<Bindings>,
    UseTemplateComponent<Bindings>,
]
