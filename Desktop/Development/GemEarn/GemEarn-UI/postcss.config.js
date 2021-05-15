module.exports = {
    plugins: [
        require('tailwindcss')('tailwind.js'),
        require('autoprefixer')(),
        require('postcss-nested'),
    ]
}
