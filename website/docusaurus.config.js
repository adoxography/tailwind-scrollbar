// @ts-check
/* eslint import/no-extraneous-dependencies: 0 */

// TODO: Figure out why the linter is unhappy with these imports
// eslint-disable-next-line import/no-unresolved
const { themes } = require('prism-react-renderer');
// eslint-disable-next-line import/no-unresolved
const tailwindcss = require('@tailwindcss/postcss');

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'tailwind-scrollbar documentation',
  tagline: 'Styling utilities for scrollbars with cross-browser support',
  favicon: 'img/favicon.ico',

  url: 'https://adoxography.github.io',
  baseUrl: '/tailwind-scrollbar/',
  organizationName: 'adoxography',
  projectName: 'tailwind-scrollbar',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  plugins: [
    async function tailwind() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(tailwindcss);
          return postcssOptions;
        }
      };
    }
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          versions: {
            current: {
              className: 'scrollbar-thin scrollbar-thumb-sky-500 hover:scrollbar-thumb-sky-400 active:scrollbar-thumb-sky-300 scrollbar-track-slate-100 self-dark:scrollbar-track-slate-900'
            }
          }
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        },
        blog: false
      })
    ]
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'tailwind-scrollbar',
        items: [
          {
            href: 'https://github.com/adoxography/tailwind-scrollbar',
            label: 'GitHub',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/'
              }
            ]
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/adoxography/tailwind-scrollbar'
              }
            ]
          }
        ]
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    })
};

module.exports = config;
