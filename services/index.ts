import { IRegisterSuccess, ISKUs } from 'types';
import { axiosGet, axiosPost } from './axios-client';

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

export const registerUser = async (email: string, password: string): Promise<{
  registerSuccess: IRegisterSuccess | undefined,
  registerFailed: boolean
}> => {
  const path = '/register';

  const data = new FormData();
  data.append('email', email);
  data.append('password', password);

  let registerSuccess;
  let registerFailed;

  try {
    const { result } = await axiosPost(path, data);
    registerSuccess = result.data;
    registerFailed = false;
  } catch (error: any) {
    console.log(error.email);
    registerSuccess = undefined;
    registerFailed = true;
  }

  return { registerSuccess, registerFailed };
};

export const signinUser = async (email: string, password: string): Promise<{
  signinSuccess: { token: string } | undefined,
  signinFailed: boolean
}> => {
  const path = '/auth/login';

  const data = new FormData();
  data.append('email', email);
  data.append('password', password);
  console.log(data);

  let signinSuccess;
  let signinFailed;

  try {
    const { result } = await axiosPost(path, data);
    signinSuccess = result.data;
    signinFailed = false;
  } catch (error: any) {
    signinSuccess = undefined;
    signinFailed = true;
  }

  return { signinSuccess, signinFailed };
};

export const deleteProduct = async (sku: string, token: string): Promise<{
  deleteSuccess: any,
  deleteFailed: boolean
}> => {
  const path = '/item/delete';

  const data = new FormData();
  data.append('sku', sku);
  console.log(data);

  let deleteSuccess;
  let deleteFailed;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const { result } = await axiosPost(path, data, { headers });
    console.log(result);
    deleteSuccess = result.data;
    deleteFailed = false;
  } catch (error: any) {
    deleteSuccess = undefined;
    deleteFailed = true;
  }

  return { deleteSuccess, deleteFailed };
};

export const getSKUsById = async (sku: string, token: string): Promise<{
  skusRes: ISKUs[],
  skusErr: boolean
}> => {
  const path = '/item/search';

  const data = new FormData();
  data.append('sku', sku);
  console.log(data);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { result, error } = await axiosPost(path, data, { headers });

  const skusRes = [result?.data] || [];
  const skusErr = !!error;

  return { skusRes, skusErr };
};
