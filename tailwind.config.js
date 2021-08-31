const plugin = require("tailwindcss/plugin");
const selectorParser = require("postcss-selector-parser");

module.exports = {
    // mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            screens: {
                'xs': '320px',
            },
            colors: {
                // brand: {
                //     50: '#FDEEEC',
                //     100: '#FACBC6',
                //     200: '#F7A8A1',
                //     300: '#F4857B',
                //     400: '#F16255',
                //     500: '#EE3928',
                //     600: '#E22412',
                //     700: '#BD1E0F',
                //     800: '#97180C',
                //     900: '#711209',
                //     DEFAULT: '#EE3928',
                //     light: '#F16255',
                //     dark: '#D02111',
                // }
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
            textColor: ['dark', 'responsive', 'hover', 'focus'],
            backgroundColor: ['active', 'dark', 'responsive', 'hover', 'focus'],
            borderColor: ['hover', 'focus', 'active'],
            borderStyle: ['hover', 'focus', 'active'],
            outline: ['hover', 'focus', 'active'],
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