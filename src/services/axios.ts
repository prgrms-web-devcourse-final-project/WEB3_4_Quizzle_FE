import axios, { AxiosError, AxiosResponse } from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_WAS_HOST,
  timeout: import.meta.env.VITE_REQUEST_TIMEOUT,
});

const responseOnFulfilled = <T>(axiosResponse: AxiosResponse<T>) => {
  const responseBody = axiosResponse.data;

  return Promise.resolve(responseBody);
};

const responseOnRejected = (axiosError: AxiosError) => {
  console.error(axiosError);

  // const axiosErrorMessage = `${axiosError.message}`;
  //
  // if (axiosError.response?.data) {
  //   const responseBody = axiosError.response?.data as {
  //     statusCode: HttpStatusCode;
  //     code: string;
  //     cause: string;
  //     message: string;
  //     name: string;
  //     stack: string;
  //   };
  //
  //     return Promise.reject(axiosError);
  //   }

  return Promise.reject(axiosError);
};

axiosClient.interceptors.response.use(responseOnFulfilled, responseOnRejected);
