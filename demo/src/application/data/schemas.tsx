import type { Control, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

export interface ZarrFormProps {
  register: UseFormRegister<LayerFormType>;
  control: Control<LayerFormType>;
  errors?: any;
}

const baseLayerSchema = z.object({
  dataType: z.enum(['zarr-maps']),
  dataDescription: z.tuple([z.string(), z.string()]),
  content: z.string()
});

const zarrVersionSchema = z.union([z.literal(2), z.literal(3)]);
const crsSchema = z.enum(['EPSG:4326', 'EPSG:3857']);
const multiscaleFormatSchema = z.enum(['auto', 'legacy', 'geozarr']);

const zarrMapsParameters = z
  .object({
    url: z.url(),
    variable: z.string(),
    crs: crsSchema.nullable().optional(),
    tileSize: z.number().optional(),
    maxZoom: z.number().optional(),
    scale: z.tuple([z.number(), z.number()]).optional(),
    opacity: z.number().optional(),
    colormap: z.string().optional(),
    zarrVersion: zarrVersionSchema.optional(),
    dimensionNames: z.record(z.string(), z.string()).optional(),
    noDataMin: z.number().optional(),
    noDataMax: z.number().optional(),
    selectors: z.record(z.string(), z.object({
      selected: z.union([z.number(), z.tuple([z.number(), z.number()])]),
      type: z.enum(['index', 'value'])
    })).optional(),
    requestOverrides: z.object({
      headers: z.record(z.string(), z.string()).optional(),
      credentials: z.enum(['omit', 'same-origin', 'include']).optional(),
      mode: z.enum(['cors', 'no-cors', 'same-origin', 'navigate']).optional(),
      cache: z.enum(['default', 'no-store', 'reload', 'no-cache', 'force-cache', 'only-if-cached']).optional()
    }).optional(),
    multiscaleFormat: multiscaleFormatSchema.optional(),
    latIsAscending: z.boolean().optional()
  })
  .strict();

export const layerFormSchema = z.discriminatedUnion('dataType', [
  baseLayerSchema.extend({
    dataType: z.literal('zarr-maps'),
    params: zarrMapsParameters
  })
]);

export type LayerFormType = z.infer<typeof layerFormSchema>;
