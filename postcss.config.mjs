/** @type {import('postcss-load-config').Config} */
// Tailwind owns the CSS transformation pipeline for the application.
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
