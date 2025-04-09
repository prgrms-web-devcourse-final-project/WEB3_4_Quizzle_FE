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

export type Room = {
  id: number;
  title: string;
  ownerId: number;
  ownerNickname: string;
  capacity: number;
  currentPlayers: number;
  status: "WAITING" | "IN_GAME" | "FINISHED";
  difficulty: "EASY" | "NORMAL" | "HARD";
  mainCategory: string;
  subCategory: string;
  password?: string;
  isPrivate: boolean;
  players: number[];
  readyPlayers: number[];
}

export type RoomListResponse = Room[];

export type Player = {
  memberId: number;
  nickname: string;
  level: number;
  isOnline: boolean;
  acceptedAt: string;
}

export type PlayerListResponse = Player[];
