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
