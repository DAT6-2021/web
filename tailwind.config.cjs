module.exports = {
    mode: 'jit',
    purge: [
        "./src/**/*.svelte",
        "./src/**/*.html"
    ],
    darkMode: 'class',
    theme: {
        extend: {}
    },
    variants: {},
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
