const typedocSidebar = require('./docs/api/typedoc-sidebar.cjs');

module.exports = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'zarr-maps',
      collapsed: false,
      collapsible: false,
      link: { type: 'doc', id: 'index' },
      items: [
        {
          type: 'category',
          label: 'Get started',
          collapsed: false,
          items: ['getting-started-leaflet', 'getting-started-openlayers']
        },
        {
          type: 'category',
          label: 'API Reference',
          collapsed: false,
          collapsible: false,
          link: { type: 'doc', id: 'api/index' },
          items: typedocSidebar
        }
      ]
    }
  ]
};
