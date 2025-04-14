import { RoomUpdateRequest } from "../../types/request";
import { AnswerType, MainCategory, SubCategory } from "../../types/room";
import { QuizzleAPI } from "../api";

export async function getRoomList() {
  try {
     
    const response = await QuizzleAPI.get("/api/v1/rooms");
    // @ts-expect-error response type from QuizzleAPI is not properly typed
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getRoom(roomId: string) {
  try {
     
    const response = await QuizzleAPI.get(`/api/v1/rooms/${roomId}`);
    // @ts-expect-error response type from QuizzleAPI is not properly typed
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function createRoom({
  title,
  capacity = 8,
  difficulty = "EASY",
  mainCategory = "SCIENCE",
  subCategory = "PHYSICS",
  answerType = "MULTIPLE_CHOICE",
  problemCount = 10,
  password,
  isPrivate = false
}: {
  title: string;
  capacity?: number;
  difficulty?: "EASY" | "NORMAL" | "HARD";
  mainCategory?: MainCategory;
  subCategory?: SubCategory;
  answerType?: AnswerType;
  problemCount?: number;
  password?: string | null;
  isPrivate?: boolean;
}) {
  try {
     
    const response = await QuizzleAPI.post("/api/v1/rooms", {
      title,
      capacity,
      difficulty,
      mainCategory,
      subCategory,
      answerType,
      problemCount,
      password,
      isPrivate
    });
    // @ts-expect-error response type from QuizzleAPI is not properly typed
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function startGame(roomId: string) {
  try {
     
    const response = await QuizzleAPI.post(`/api/v1/rooms/${roomId}/start`);
    // @ts-expect-error response type from QuizzleAPI is not properly typed
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function readyGame(roomId: string) {
  try {
     
    const response = await QuizzleAPI.post(`/api/v1/rooms/${roomId}/ready`);
    // @ts-expect-error response type from QuizzleAPI is not properly typed
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function leaveRoom(roomId: string) {
  try {
     
    const response = await QuizzleAPI.post(`/api/v1/rooms/${roomId}/leave`);
    console.log("response :", response)
    // @ts-expect-error response type from QuizzleAPI is not properly typed
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function joinRoom(roomId: string, password?: string) {
  try {
     
    const response = await QuizzleAPI.post(`/api/v1/rooms/${roomId}/join`, {
      password
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateRoomInfo(roomId: string, roomInfo: RoomUpdateRequest) {
  try {
    const response = await QuizzleAPI.put(`/api/v1/rooms/${roomId}`, roomInfo);
    // @ts-expect-error response type from QuizzleAPI is not properly typed
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}