module.exports = {
  prefix: 'tw-',
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms'),
  ],
}
