import type { Control, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

export interface ZarrFormProps {
  register: UseFormRegister<LayerFormType>;
  control: Control<LayerFormType>;
  errors?: any;
}

const baseLayerSchema = z.object({
  dataType: z.enum(['zarr-leaflet']),
  dataDescription: z.tuple([z.string(), z.string()]),
  content: z.string()
});

const zarrVersionSchema = z.union([z.literal(2), z.literal(3)]);
const crsSchema = z.enum(['EPSG:4326', 'EPSG:3857']);

const zarrLeafletParams = z
  .object({
    url: z.string().url(),
    variable: z.string(),
    crs: crsSchema.nullable().optional(),
    tileWidth: z.number().optional(),
    tileHeight: z.number().optional(),
    minimumLevel: z.number().optional(),
    maximumLevel: z.number().optional(),
    scale: z.tuple([z.number(), z.number()]).optional(),
    opacity: z.number().optional(),
    colormap: z.string().optional(),
    zarrVersion: zarrVersionSchema.optional(),
    dimensionNames: z.record(z.string(), z.string()).optional(),
    noDataMin: z.number().optional(),
    noDataMax: z.number().optional()
  })
  .strict();

export const layerFormSchema = z.discriminatedUnion('dataType', [
  baseLayerSchema.extend({
    dataType: z.literal('zarr-leaflet'),
    params: zarrLeafletParams
  })
]);

export type LayerFormType = z.infer<typeof layerFormSchema>;
