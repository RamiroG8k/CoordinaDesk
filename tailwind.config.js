module.exports = {
    purge: [
        './src/**/*.{js,jsx,ts,tsx}',
        './public/index.html'
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            screens: {
                'xs': '320px',
            },
            borderRadius: {
                '4xl': '2rem;',
                '5xl': '2.5rem;',
                '6xl': '3rem;'
            },
            transitionProperty: {
                'width': 'width'
            },
            minHeight: {
                '0': '0',
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                'full': '100%',
            }
        },
    },
    variants: {
        extend: {
            display: ['dark'],
            backgroundColor: ['dark', 'hover'],
            dark: ['backgroundColor', 'hover'],
            animation: ['hover', 'focus'],
            width: ['hover'],
            fontWeight: ['hover'],
            opacity: ['disabled'],
            scale: ['hover'],
        },
    },
    plugins: [
        require('tailwind-scrollbar-hide'),
    ],
}