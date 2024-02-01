/* eslint import/no-extraneous-dependencies: 0 */
/* eslint global-require: 0 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './docusaurus.config.js',
    './src/**/*.{js,jsx,ts,tsx}',
    './docs/*.{md,mdx}'
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        custom: {
          DEFAULT: '#10B981',
          light: '#D1FAE5'
        }
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar')({
      nocompatible: true,
      preferredStrategy: 'pseudoelements'
    }),
    require('tailwindcss/plugin')(({ addVariant }) => {
      addVariant('self-dark', '[data-theme="dark"]&');
    })
  ]
};
