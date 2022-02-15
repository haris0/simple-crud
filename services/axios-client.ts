import axios from 'axios';

export const baseURL = 'https://hoodwink.medkomtek.net/api';

const axiosInstance = axios.create({
  baseURL,
  timeout: 3000,
});

export const axiosGet = async (url: string, config?: {}): Promise<any> => {
  let data = null;
  let error = null;

  try {
    const response = await axiosInstance.get(url, config);
    data = response;
  } catch (err) {
    error = err;
  }

  return { data, error };
};

export const axiosPost = async (url: string, data?: {} | undefined, config?: {}): Promise<any> => {
  let result = null;
  let error = null;

  try {
    const response = await axiosInstance.post(url, data, config);
    result = response;
  } catch (err) {
    error = err;
  }

  return { result, error };
};
