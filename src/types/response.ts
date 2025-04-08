export interface BaseResponse<IData> {
  resultCode: string;
  msg: string;
  data: IData;
}

export interface TokenInfoData {
  accessToken: string;
  accessTokenExpiryTime: number;
  refreshToken: string;
}