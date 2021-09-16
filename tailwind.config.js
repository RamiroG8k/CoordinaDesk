const plugin = require("tailwindcss/plugin");
const selectorParser = require("postcss-selector-parser");

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {
            screens: {
                'xs': '320px',
            },
            borderRadius: {
                '4xl': '2.5rem;',
                '5xl': '3.5rem;'
            },
            transitionProperty: {
                'width': 'width'
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['dark', 'hover'],
            dark: ['backgroundColor', 'hover'],
            width: ['hover'],
            fontWeight: ['hover'],
        },
    },
    plugins: [
        plugin(function ({ addVariant, prefix }) {
            addVariant('dark', ({ modifySelectors, separator }) => {
                modifySelectors(({ selector }) => {
                    return selectorParser((selectors) => {
                        selectors.walkClasses((sel) => {
                            sel.value = `dark${separator}${sel.value}`
                            sel.parent.insertBefore(sel, selectorParser().astSync('.scheme-dark '))
                        })
                    }).processSync(selector)
                })
            })
        })
    ],
}