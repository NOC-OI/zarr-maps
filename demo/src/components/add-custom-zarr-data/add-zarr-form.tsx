import { FormProvider, useForm } from 'react-hook-form';
import { getDefaultLayerValues } from './_actions/actions';
import { layerFormSchema, type LayerFormType } from '../../application/data/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect } from 'react';
import { Button } from '../ui/button';
import { useLayersManagementHandle } from '../../application/use-layers';
import { handleChangeMapLayerAndAddLegend } from '../data-exploration/_actions/actions';
import { ZarrForm } from './zarr-form';

export function AddZarrForm() {
  const form = useForm<LayerFormType>({
    resolver: zodResolver(layerFormSchema),
    defaultValues: getDefaultLayerValues()
  });
  const {
    listLayers,
    setListLayers,
    setActualLayer,
    setSelectedLayers,
    setLayerAction,
    setLayerLegend,
    layerLegend
  } = useLayersManagementHandle();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = form;

  useEffect(() => {
    reset(getDefaultLayerValues());
  }, [reset]);

  const onSubmit = (data: LayerFormType) => {
    const variableName = data.params.variable;
    const newLayerName = variableName + '-' + Math.random().toString(36).substring(2, 6);
    const updatedLayers = listLayers['Updated Layers'] || { layerNames: {} };
    updatedLayers.layerNames[newLayerName] = data;

    setListLayers(prev => {
      return {
        ...prev,
        'Updated Layers': updatedLayers
      };
    });
    handleChangeMapLayerAndAddLegend(
      true,
      { subLayer: 'Updated Layers_' + newLayerName, dataInfo: data },
      setActualLayer,
      setLayerAction,
      setSelectedLayers,
      newLayerName,
      setLayerLegend,
      layerLegend,
      'Updated Layers'
    );

    reset(getDefaultLayerValues());
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 ...">
        <ZarrForm register={register} control={control} errors={errors} />
        <Button
          className="w-full text-white bg-black rounded-lg opacity-100 hover:opacity-80 flex justify-center items-center py-2! gap-2 clickable"
          type="submit"
        >
          Add Layer
        </Button>
      </form>
    </FormProvider>
  );
}
