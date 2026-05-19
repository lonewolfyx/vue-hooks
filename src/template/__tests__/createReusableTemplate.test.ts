import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { createReusableTemplate } from '../createReusableTemplate.ts'

describe('createReusableTemplate', () => {
    it('should return a tuple of [DefineTemplate, UseTemplate]', () => {
        const [DefineTemplate, UseTemplate] = createReusableTemplate()

        expect(DefineTemplate).toBeTruthy()
        expect(UseTemplate).toBeTruthy()
    })

    it('should reuse the same template with different attrs and listeners', async () => {
        const onFoo = vi.fn()

        const App = defineComponent({
            setup() {
                const [DefineTemplate, UseTemplate] = createReusableTemplate<{
                    title?: string
                    onFoo?: (value: number) => void
                }>()

                return () => [
                    h(DefineTemplate, null, {
                        default: ({ title, onFoo }) =>
                            h('div', { class: 'reusable-template' }, [
                                h('div', { class: 'template-title' }, title ?? 'empty'),
                                h('button', { class: 'template-trigger', onClick: () => onFoo?.(123) }, 'trigger'),
                            ]),
                    }),
                    h(UseTemplate, { title: 'header', onFoo }),
                    h(UseTemplate, { onFoo }),
                ]
            },
        })

        const wrapper = mount(App)
        const titles = wrapper.findAll('.template-title').map(node => node.text())

        expect(wrapper.findAll('.reusable-template')).toHaveLength(2)
        expect(titles).toEqual(['header', 'empty'])

        const triggers = wrapper.findAll('.template-trigger')
        await triggers[0].trigger('click')
        await triggers[1].trigger('click')

        expect(onFoo).toHaveBeenCalledTimes(2)
        expect(onFoo).toHaveBeenNthCalledWith(1, 123)
        expect(onFoo).toHaveBeenNthCalledWith(2, 123)
    })

    it('should react to binding updates on UseTemplate', async () => {
        const title = ref('first')

        const App = defineComponent({
            setup() {
                const [DefineTemplate, UseTemplate] = createReusableTemplate<{
                    title?: string
                }>()

                return () => [
                    h(DefineTemplate, null, {
                        default: ({ title }) => h('div', { class: 'template-value' }, title ?? 'missing'),
                    }),
                    h(UseTemplate, { title: title.value }),
                ]
            },
        })

        const wrapper = mount(App)

        expect(wrapper.find('.template-value').text()).toBe('first')

        title.value = 'second'
        await nextTick()

        expect(wrapper.find('.template-value').text()).toBe('second')
    })

    it('should render nothing when no template is defined', () => {
        const App = defineComponent({
            setup() {
                const [, UseTemplate] = createReusableTemplate<{ title?: string }>()
                return () => h(UseTemplate, { title: 'unused' })
            },
        })

        const wrapper = mount(App)
        expect(wrapper.html()).toBe('')
    })
})
