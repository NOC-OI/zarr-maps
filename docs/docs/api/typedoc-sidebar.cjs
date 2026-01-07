// @ts-check
/** @type {import("@docusaurus/plugin-content-docs").SidebarsConfig} */
const typedocSidebar = {
  items: [
    {
      type: "category",
      label: "index",
      items: [
        {
          type: "category",
          label: "Classes",
          items: [
            {
              type: "doc",
              id: "api/index/classes/ZarrLayerProvider",
              label: "ZarrLayerProvider"
            }
          ]
        },
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/index/interfaces/BoundsProps",
              label: "BoundsProps"
            },
            {
              type: "doc",
              id: "api/index/interfaces/ColorMapInfo",
              label: "ColorMapInfo"
            },
            {
              type: "doc",
              id: "api/index/interfaces/ColorScaleProps",
              label: "ColorScaleProps"
            },
            {
              type: "doc",
              id: "api/index/interfaces/DataSliceProps",
              label: "DataSliceProps"
            },
            {
              type: "doc",
              id: "api/index/interfaces/DimensionNamesProps",
              label: "DimensionNamesProps"
            },
            {
              type: "doc",
              id: "api/index/interfaces/DimensionValues",
              label: "DimensionValues"
            },
            {
              type: "doc",
              id: "api/index/interfaces/DimIndicesProps",
              label: "DimIndicesProps"
            },
            {
              type: "doc",
              id: "api/index/interfaces/XYLimits",
              label: "XYLimits"
            },
            {
              type: "doc",
              id: "api/index/interfaces/XYLimitsProps",
              label: "XYLimitsProps"
            },
            {
              type: "doc",
              id: "api/index/interfaces/ZarrLevelMetadata",
              label: "ZarrLevelMetadata"
            },
            {
              type: "doc",
              id: "api/index/interfaces/ZarrSelectors",
              label: "ZarrSelectors"
            },
            {
              type: "doc",
              id: "api/index/interfaces/ZarrSelectorsProps",
              label: "ZarrSelectorsProps"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/index/functions/calculateNearestIndex",
              label: "calculateNearestIndex"
            },
            {
              type: "doc",
              id: "api/index/functions/calculateSliceArgs",
              label: "calculateSliceArgs"
            },
            {
              type: "doc",
              id: "api/index/functions/colormapBuilder",
              label: "colormapBuilder"
            },
            {
              type: "doc",
              id: "api/index/functions/colorScaleByName",
              label: "colorScaleByName"
            },
            {
              type: "doc",
              id: "api/index/functions/createColorRampTexture",
              label: "createColorRampTexture"
            },
            {
              type: "doc",
              id: "api/index/functions/createProgram",
              label: "createProgram"
            },
            {
              type: "doc",
              id: "api/index/functions/createShader",
              label: "createShader"
            },
            {
              type: "doc",
              id: "api/index/functions/decodeCFTime",
              label: "decodeCFTime"
            },
            {
              type: "doc",
              id: "api/index/functions/detectCRS",
              label: "detectCRS"
            },
            {
              type: "doc",
              id: "api/index/functions/extractNoDataMetadata",
              label: "extractNoDataMetadata"
            },
            {
              type: "doc",
              id: "api/index/functions/getXYLimits",
              label: "getXYLimits"
            },
            {
              type: "doc",
              id: "api/index/functions/identifyDimensionIndices",
              label: "identifyDimensionIndices"
            },
            {
              type: "doc",
              id: "api/index/functions/initZarrDataset",
              label: "initZarrDataset"
            },
            {
              type: "doc",
              id: "api/index/functions/latDegToMercY",
              label: "latDegToMercY"
            },
            {
              type: "doc",
              id: "api/index/functions/loadDimensionValues",
              label: "loadDimensionValues"
            },
            {
              type: "doc",
              id: "api/index/functions/lonDegToMercX",
              label: "lonDegToMercX"
            },
            {
              type: "doc",
              id: "api/index/functions/openLevelArray",
              label: "openLevelArray"
            },
            {
              type: "doc",
              id: "api/index/functions/parseCFUnits",
              label: "parseCFUnits"
            },
            {
              type: "doc",
              id: "api/index/functions/resolveNoDataRange",
              label: "resolveNoDataRange"
            }
          ]
        },
        {
          type: "category",
          label: "Type Aliases",
          items: [
            {
              type: "doc",
              id: "api/index/type-aliases/CalendarDate",
              label: "CalendarDate"
            },
            {
              type: "doc",
              id: "api/index/type-aliases/CFCalendar",
              label: "CFCalendar"
            },
            {
              type: "doc",
              id: "api/index/type-aliases/ColorMapName",
              label: "ColorMapName"
            },
            {
              type: "doc",
              id: "api/index/type-aliases/CRS",
              label: "CRS"
            },
            {
              type: "doc",
              id: "api/index/type-aliases/SliceArgs",
              label: "SliceArgs"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/index/index"
      }
    },
    {
      type: "category",
      label: "leaflet",
      items: [
        {
          type: "category",
          label: "Classes",
          items: [
            {
              type: "doc",
              id: "api/leaflet/classes/ZarrLayer",
              label: "ZarrLayer"
            }
          ]
        },
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/leaflet/interfaces/LeafletLayerOptions",
              label: "LeafletLayerOptions"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/leaflet/index"
      }
    },
    {
      type: "category",
      label: "ol",
      items: [
        {
          type: "category",
          label: "Classes",
          items: [
            {
              type: "doc",
              id: "api/ol/classes/ZarrLayer",
              label: "ZarrLayer"
            }
          ]
        },
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/ol/interfaces/OLLayerOptions",
              label: "OLLayerOptions"
            },
            {
              type: "doc",
              id: "api/ol/interfaces/ZarrImageElement",
              label: "ZarrImageElement"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/ol/index"
      }
    }
  ]
};
module.exports = typedocSidebar.items;