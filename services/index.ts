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

export const addProduct = async (
  sku: string,
  productName: string,
  qty: string,
  price: string,
  unit: string,
  status: string,
  token: string,
): Promise<{
  addRes: ISKUs | { success: boolean, message: string},
  addErr: boolean
}> => {
  const path = '/item/add';

  const data = new FormData();
  data.append('sku', sku);
  data.append('product_name', productName);
  data.append('qty', qty);
  data.append('price', price);
  data.append('unit', unit);
  data.append('status', status);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { result } = await axiosPost(path, data, { headers });
  if (result?.data.id) {
    const addRes: ISKUs = result?.data || undefined;
    const addErr = false;

    return { addRes, addErr };
  }

  const addRes: { success: boolean, message: string} = result?.data.message || undefined;
  const addErr = true;

  return { addRes, addErr };
};

export const editProduct = async (
  sku: string,
  productName: string,
  qty: string,
  price: string,
  unit: string,
  status: string,
  token: string,
): Promise<{
  editRes: ISKUs | { success: boolean, message: string},
  editErr: boolean
}> => {
  const path = '/item/update';

  const data = new FormData();
  data.append('sku', sku);
  data.append('product_name', productName);
  data.append('qty', qty);
  data.append('price', price);
  data.append('unit', unit);
  data.append('status', status);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { result } = await axiosPost(path, data, { headers });
  console.log(result);
  if (result?.data.id) {
    const editRes: ISKUs = result?.data || undefined;
    const editErr = false;

    return { editRes, editErr };
  }

  const editRes: { success: boolean, message: string} = result?.data.message || undefined;
  const editErr = true;

  return { editRes, editErr };
};
