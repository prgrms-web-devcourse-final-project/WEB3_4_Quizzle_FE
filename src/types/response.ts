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


export type UserProfile = {
  id: number;
  nickname: string;
  avatarUrl: string;
  level: number;
  exp: number;
  point: number;
}

export type FriendRequest = {
  memberId: number;
  nickname: string;
  requestedAt: string;
}

export type Avatar = {
  id: number;
  fileName: string;
  price: number;
  status: "AVAILABLE" | "OWNED";
  url: string;
}

export type AvailableAvatarList = Avatar[];
