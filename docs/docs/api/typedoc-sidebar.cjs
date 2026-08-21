// @ts-check
/** @type {import("@docusaurus/plugin-content-docs").SidebarsConfig} */
const typedocSidebar = {
  items: [
    {
      type: "category",
      label: "zarr-maps-colormap",
      items: [
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/zarr-maps-colormap/interfaces/ColorMapInfo",
              label: "ColorMapInfo"
            },
            {
              type: "doc",
              id: "api/zarr-maps-colormap/interfaces/ColorScaleProps",
              label: "ColorScaleProps"
            }
          ]
        },
        {
          type: "category",
          label: "Type Aliases",
          items: [
            {
              type: "doc",
              id: "api/zarr-maps-colormap/type-aliases/ColorMapName",
              label: "ColorMapName"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/zarr-maps-colormap/functions/colormapBuilder",
              label: "colormapBuilder"
            },
            {
              type: "doc",
              id: "api/zarr-maps-colormap/functions/colorScaleByName",
              label: "colorScaleByName"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/zarr-maps-colormap/index"
      }
    },
    {
      type: "category",
      label: "zarr-maps-leaflet",
      items: [
        {
          type: "category",
          label: "Classes",
          items: [
            {
              type: "doc",
              id: "api/zarr-maps-leaflet/classes/ZarrLayer",
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
              id: "api/zarr-maps-leaflet/interfaces/LeafletLayerOptions",
              label: "LeafletLayerOptions"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/zarr-maps-leaflet/index"
      }
    },
    {
      type: "category",
      label: "zarr-maps-ol",
      items: [
        {
          type: "category",
          label: "Classes",
          items: [
            {
              type: "doc",
              id: "api/zarr-maps-ol/classes/ZarrLayer",
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
              id: "api/zarr-maps-ol/interfaces/OLLayerOptions",
              label: "OLLayerOptions"
            },
            {
              type: "doc",
              id: "api/zarr-maps-ol/interfaces/ZarrImageElement",
              label: "ZarrImageElement"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/zarr-maps-ol/index"
      }
    },
    {
      type: "category",
      label: "zarr-maps-tiling",
      items: [
        {
          type: "category",
          label: "Classes",
          items: [
            {
              type: "doc",
              id: "api/zarr-maps-tiling/classes/ZarrTileProvider",
              label: "ZarrTileProvider"
            }
          ]
        },
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/BoundsProps",
              label: "BoundsProps"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/DataSliceProps",
              label: "DataSliceProps"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/DimensionNamesProps",
              label: "DimensionNamesProps"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/DimensionValues",
              label: "DimensionValues"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/DimIndicesProps",
              label: "DimIndicesProps"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/FullTransectResult",
              label: "FullTransectResult"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/QueryBackend",
              label: "QueryBackend"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/QueryMultiPolygonGeometry",
              label: "QueryMultiPolygonGeometry"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/QueryOptions",
              label: "QueryOptions"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/QueryPointGeometry",
              label: "QueryPointGeometry"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/QueryPolygonGeometry",
              label: "QueryPolygonGeometry"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/QueryResult",
              label: "QueryResult"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/RequestOverrides",
              label: "RequestOverrides"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/RequestParameters",
              label: "RequestParameters"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/TransectQueryOptions",
              label: "TransectQueryOptions"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/TransectResult",
              label: "TransectResult"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/XYLimits",
              label: "XYLimits"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/XYLimitsProps",
              label: "XYLimitsProps"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/ZarrLevelMetadata",
              label: "ZarrLevelMetadata"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/ZarrSelectors",
              label: "ZarrSelectors"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/ZarrSelectorsProps",
              label: "ZarrSelectorsProps"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/interfaces/ZarrTileOptions",
              label: "ZarrTileOptions"
            }
          ]
        },
        {
          type: "category",
          label: "Type Aliases",
          items: [
            {
              type: "doc",
              id: "api/zarr-maps-tiling/type-aliases/BrowserName",
              label: "BrowserName"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/type-aliases/CalendarDate",
              label: "CalendarDate"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/type-aliases/CFCalendar",
              label: "CFCalendar"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/type-aliases/CRS",
              label: "CRS"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/type-aliases/MultiscaleFormat",
              label: "MultiscaleFormat"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/type-aliases/OnAuthError",
              label: "OnAuthError"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/type-aliases/QueryGeometry",
              label: "QueryGeometry"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/type-aliases/QueryPosition",
              label: "QueryPosition"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/type-aliases/SliceArgs",
              label: "SliceArgs"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/type-aliases/TransformRequest",
              label: "TransformRequest"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/calculateElevationSlice",
              label: "calculateElevationSlice"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/calculateHeightMeters",
              label: "calculateHeightMeters"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/calculateNearestIndex",
              label: "calculateNearestIndex"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/calculateSliceArgs",
              label: "calculateSliceArgs"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/calculateSliceArgsRequestImage",
              label: "calculateSliceArgsRequestImage"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/calculateXYFromBounds",
              label: "calculateXYFromBounds"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/createColorRampTexture",
              label: "createColorRampTexture"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/createProgram",
              label: "createProgram"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/createShader",
              label: "createShader"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/decodeCFTime",
              label: "decodeCFTime"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/detectBrowser",
              label: "detectBrowser"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/detectCRS",
              label: "detectCRS"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/extractNoDataMetadata",
              label: "extractNoDataMetadata"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/getCubeDimensions",
              label: "getCubeDimensions"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/getFullTransect",
              label: "getFullTransect"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/getTimeSeries",
              label: "getTimeSeries"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/getTransect",
              label: "getTransect"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/getVerticalProfile",
              label: "getVerticalProfile"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/getXYLimits",
              label: "getXYLimits"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/getZarrData",
              label: "getZarrData"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/identifyDimensionIndices",
              label: "identifyDimensionIndices"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/initZarrDataset",
              label: "initZarrDataset"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/latDegToMercY",
              label: "latDegToMercY"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/loadDimensionValues",
              label: "loadDimensionValues"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/lonDegToMercX",
              label: "lonDegToMercX"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/openLevelArray",
              label: "openLevelArray"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/parseCFUnits",
              label: "parseCFUnits"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/resolveNoDataRange",
              label: "resolveNoDataRange"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/sampleTransectPositions",
              label: "sampleTransectPositions"
            },
            {
              type: "doc",
              id: "api/zarr-maps-tiling/functions/updateImgData",
              label: "updateImgData"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/zarr-maps-tiling/index"
      }
    }
  ]
};
module.exports = typedocSidebar.items;