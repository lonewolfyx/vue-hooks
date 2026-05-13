import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { createContext } from '../createContext.ts'

describe('createContext', () => {
    it('should return a tuple of [use, provideContext]', () => {
        const [use, provideContext] = createContext<{ name: string }>('Test')
        expect(typeof use).toBe('function')
        expect(typeof provideContext).toBe('function')
    })

    it('should provide and inject context value', () => {
        const [use, provideContext] = createContext<{ count: number }>('TestProvider')

        const Child = defineComponent({
            setup() {
                const ctx = use()
                return () => h('div', String(ctx.count))
            },
        })

        const Provider = defineComponent({
            setup() {
                provideContext({ count: 42 })
                return () => h(Child)
            },
        })

        const wrapper = mount(Provider)
        expect(wrapper.text()).toBe('42')
    })

    it('should throw when context is not provided and no fallback', () => {
        const [use] = createContext<{ value: string }>('TestProvider')

        const Child = defineComponent({
            setup() {
                use()
                return () => h('div')
            },
        })

        expect(() => mount(Child)).toThrow(/not found/)
    })

    it('should throw with correct component name in error message', () => {
        const [use] = createContext<{ value: string }>('MyProvider')

        const Child = defineComponent({
            setup() {
                use()
                return () => h('div')
            },
        })

        expect(() => mount(Child)).toThrow(/`MyProvider`/)
    })

    it('should throw with multiple component names in error message', () => {
        const [use] = createContext<{ value: string }>(['ProviderA', 'ProviderB'])

        const Child = defineComponent({
            setup() {
                use()
                return () => h('div')
            },
        })

        expect(() => mount(Child)).toThrow(/ProviderA, ProviderB/)
    })

    it('should return fallback when context is not provided', () => {
        const [use] = createContext<{ value: string }>('TestProvider')

        let result: { value: string } | undefined
        const Child = defineComponent({
            setup() {
                result = use({ value: 'fallback' })
                return () => h('div', result!.value)
            },
        })

        const wrapper = mount(Child)
        expect(result).toEqual({ value: 'fallback' })
        expect(wrapper.text()).toBe('fallback')
    })

    it('should return null when null is explicitly provided', () => {
        const [use, provideContext] = createContext<string | null>('NullProvider')

        let result: string | null | undefined
        const Child = defineComponent({
            setup() {
                result = use()
                return () => h('div', String(result))
            },
        })

        const Provider = defineComponent({
            setup() {
                provideContext(null)
                return () => h(Child)
            },
        })

        mount(Provider)
        expect(result).toBeNull()
    })

    it('should return null when null fallback is passed', () => {
        const [use] = createContext<string>('TestProvider')

        let result: string | null | undefined
        const Child = defineComponent({
            setup() {
                result = use(null)
                return () => h('div', String(result))
            },
        })

        mount(Child)
        expect(result).toBeNull()
    })

    it('provideContext should return the provided value', () => {
        const [, provideContext] = createContext<{ id: number }>('TestProvider')
        const value = { id: 1 }
        const returned = provideContext(value)
        expect(returned).toBe(value)
    })

    it('should support deeply nested components', () => {
        const [use, provideContext] = createContext<{ name: string }>('DeepProvider')

        const GrandChild = defineComponent({
            setup() {
                const ctx = use()
                return () => h('span', ctx.name)
            },
        })

        const Middle = defineComponent({
            setup() {
                return () => h(GrandChild)
            },
        })

        const Parent = defineComponent({
            setup() {
                provideContext({ name: 'deep' })
                return () => h(Middle)
            },
        })
        const wrapper = mount(Parent)
        expect(wrapper.text()).toBe('deep')
    })

    it('should create independent contexts with different names', () => {
        const [useA, provideA] = createContext<string>('ProviderA')
        const [useB, provideB] = createContext<string>('ProviderB')

        let valA: string, valB: string
        const Child = defineComponent({
            setup() {
                valA = useA()
                valB = useB()
                return () => h('div', `${valA}-${valB}`)
            },
        })

        const Provider = defineComponent({
            setup() {
                provideA('A')
                provideB('B')
                return () => h(Child)
            },
        })

        const wrapper = mount(Provider)
        expect(wrapper.text()).toBe('A-B')
    })

    it('should use custom contextName for Symbol description', () => {
        const [use] = createContext<{ value: string }>('MyProvider', 'CustomKey')

        const Child = defineComponent({
            setup() {
                use()
                return () => h('div')
            },
        })

        expect(() => mount(Child)).toThrow(/CustomKey/)
    })
})
