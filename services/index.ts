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
