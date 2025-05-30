import {axiosClient} from "./axios.ts";
import {API_PATH} from "../consts/quizzleAPIPath.ts";
import {AxiosHeaders, RawAxiosRequestHeaders} from "axios";
import {BaseResponse, TokenInfoData} from "../types/response.ts";

interface QueryParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export class APIClient {
  private static getURLWithQueryParamString = (url: string, queryParams?: QueryParams) => {
    const urlSearchParams = new URLSearchParams(queryParams);
    const queryParamString = urlSearchParams.toString();

    url = `${url}` + (queryParamString ? `?${queryParamString}` : "");

    return url;
  };

  private static generateAxiosConfig = (headers?: (RawAxiosRequestHeaders | AxiosHeaders)) => {
    const config = {
      headers: headers
    }

    return config;
  }

  static get = async <ResponseBody>(url: string, queryParams?: QueryParams, headers?: (RawAxiosRequestHeaders| AxiosHeaders)) => {
    url = this.getURLWithQueryParamString(url, queryParams);

    const config = this.generateAxiosConfig(headers);
    const response = await axiosClient.get<ResponseBody>(url, config) as ResponseBody;

    return response;
  };

  static put = async <RequestBody, ResponseBody>(url: string, data?: RequestBody, headers?: (RawAxiosRequestHeaders | AxiosHeaders)) => {
    const config = this.generateAxiosConfig(headers);
    const responseBody = await axiosClient.put<ResponseBody>(url, data, config) as ResponseBody;

    return responseBody;
  };

  static post = async <RequestBody, ResponseBody>(url: string, data?: RequestBody, headers?: (RawAxiosRequestHeaders | AxiosHeaders)) => {
    const config = this.generateAxiosConfig(headers);
    console.log("Request Body:", data);
    const responseBody = await axiosClient.post<ResponseBody>(url, data, config) as ResponseBody;

    return responseBody;
  };

  static delete = async <ResponseBody>(url: string, queryParams: QueryParams, headers?: (RawAxiosRequestHeaders | AxiosHeaders)) => {
    url = this.getURLWithQueryParamString(url, queryParams);

    const config = this.generateAxiosConfig(headers);
    const responseBody = axiosClient.delete(url, config) as ResponseBody;

    return responseBody;
  };

  static patch = async <RequestBody, ResponseBody>(url: string, data?: RequestBody, headers?: (RawAxiosRequestHeaders | AxiosHeaders)) => {
    const config = this.generateAxiosConfig(headers);
    const responseBody = await axiosClient.patch<ResponseBody>(url, data, config) as ResponseBody;

    return responseBody;
  };
}

export class QuizzleAPI extends APIClient {
  static checkOAuthValid = async (accessToken: string, refreshToken: string) => {
    const queryParam = {
      accessToken,
      refreshToken,
      status: "SUCCESS"
    }
    const checkOAuthValidResponse = await this.get(API_PATH.AUTH_OAUTH2_CALLBACK, queryParam);

    console.log("checkOAuthValidResponse : ", checkOAuthValidResponse);

    return checkOAuthValidResponse;
  }

  static getTokenInfo = async () => {
    const tokenInfo = await this.get<BaseResponse<TokenInfoData>>(API_PATH.AUTH_TOKEN_INFO);

    return tokenInfo;
  }
}
