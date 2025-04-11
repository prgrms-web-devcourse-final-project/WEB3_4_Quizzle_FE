import { Room } from "../types/response";

export const mockRoomList : Room[] = [
  {
    id: 1,
    title: "과학 퀴즈방",
    ownerId: 1,
    ownerNickname: "퀴즈마스터",
    capacity: 8,
    currentPlayers: 4,
    status: "WAITING",
    difficulty: "EASY",
    mainCategory: "SCIENCE",
    subCategory: "PHYSICS",
    isPrivate: false,
    players: [1, 2, 3, 4],
    readyPlayers: [2, 3]
  },
  {
    id: 2, 
    title: "역사 퀴즈방",
    ownerId: 2,
    ownerNickname: "역사박사",
    capacity: 6,
    currentPlayers: 3,
    status: "WAITING",
    difficulty: "NORMAL",
    mainCategory: "HISTORY",
    subCategory: "KOREAN_HISTORY",
    password: "1234",
    isPrivate: true,
    players: [2, 5, 6],
    readyPlayers: [5, 6]
  },
  {
    id: 3,
    title: "영어 퀴즈방",
    ownerId: 3, 
    ownerNickname: "영어천재",
    capacity: 4,
    currentPlayers: 4,
    status: "IN_GAME",
    difficulty: "HARD",
    mainCategory: "LANGUAGE",
    subCategory: "ENGLISH",
    isPrivate: false,
    players: [3, 7, 8, 9],
    readyPlayers: [3, 7, 8, 9]
  }
]