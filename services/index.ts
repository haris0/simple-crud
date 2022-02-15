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
  registerFailed: boolean | undefined
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
    registerFailed = undefined;
  } catch (error: any) {
    console.log(error.email);
    registerSuccess = undefined;
    registerFailed = true;
  }

  return { registerSuccess, registerFailed };
};
