import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'zarr-maps',
  tagline: 'Visualize multidimensional Zarr datasets in Leaflet',
  url: 'https://noc-oi.github.io',
  baseUrl: '/zarr-maps/docs/',

  organizationName: 'NOC-OI',
  projectName: 'zarr-maps',
  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn'
    }
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },
  // staticDirectories: ["static"],
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
        plugin: ['./typedoc-plugin.mjs'],
        readme: 'none',
        indexFormat: 'table',
        disableSources: true,
        groupOrder: ['Classes', 'Interfaces', 'type-aliases', 'functions'],
        sidebar: {
          pretty: true
        },
        textContentMappings: {
          'title.indexPage': 'API Reference',
          'title.memberPage': '{name}'
        },
        parametersFormat: 'table',
        enumMembersFormat: 'table',
        useCodeBlocks: true,
        cleanOutputDir: true,
        externalSymbolLinkMappings: {
          leaflet: {},
          typescript: {
            WebGLShader: 'https://developer.mozilla.org/en-US/docs/Web/API/WebGLShader',
            WebGLProgram: 'https://developer.mozilla.org/en-US/docs/Web/API/WebGLProgram',
            WebGLTexture: 'https://developer.mozilla.org/en-US/docs/Web/API/WebGLTexture',
            ImageData: 'https://developer.mozilla.org/en-US/docs/Web/API/ImageData'
          }
        }
      }
    ]
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/'
        },
        blog: false,
        theme: {
          customCss: './assets/custom.css'
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'assets/favicon.ico',
      navbar: {
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'zarr-maps Docs'
          },
          {
            href: 'https://github.com/NOC-OI/zarr-maps',
            label: 'GitHub',
            position: 'right'
          },
          {
            label: 'Demo',
            href: 'https://noc-oi.github.io/zarr-maps',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        links: [
          {
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/NOC-OI/zarr-maps'
              },
              {
                label: 'Demo',
                href: 'https://noc-oi.github.io/zarr-maps'
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} National Oceanography Centre (NOC).`
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula
      }
    })
};

export default config;
