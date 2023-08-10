/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#E31836',
                secondary: '#F3F3F7',
                'bg-secondary':
                    'linear-gradient(180deg, #FFF 0%, #FCFCFC 100%)',
                neutral: '#5C6370',
            },
            fontFamily: {
                header: ['Roboto Slab'],
                logo: ['Kaushan Script', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
