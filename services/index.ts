import { ISKUs } from 'types';
import { axiosGet } from './axios-client';

export const getSKUsData = async (): Promise<{
  skusRes: ISKUs[],
  skusErr: boolean
}> => {
  const path = '/items';

  const { data, error } = await axiosGet(path);

  const skusRes = data?.data || [];
  const skusErr = !!error;

  return { skusRes, skusErr };
};
