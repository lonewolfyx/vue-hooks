import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'

const docsRoot = resolve(__dirname, '..')

export default defineConfig({
    title: '@lonewolfyx/vue-hooks',
    description: 'Collection of Vue Composition Utilities',

    lastUpdated: true,
    srcDir: resolve(__dirname, '../src'),
    rewrites: {
        'content/(.*)': '(.*)',
    },

    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Get Started', link: '/guide/get-started' },
            {
                text: 'Hooks',
                items: [
                    { text: 'createContext', link: '/hooks/create-context' },
                ],
            },
        ],

        sidebar: [
            {
                text: 'Guide',
                items: [
                    { text: 'Get Started', link: '/guide/get-started' },
                    { text: 'Installation', link: '/guide/installation' },
                    { text: 'Contributing', link: '/guide/contributing' },
                ],
            },
            {
                text: 'Hooks',
                items: [
                    { text: 'createContext', link: '/hooks/create-context' },
                ],
            },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/lonewolfyx/vue-hooks' },
        ],
    },
})
