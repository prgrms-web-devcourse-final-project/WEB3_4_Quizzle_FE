import { QuizzleAPI } from "../api";
import { RoomListResponse } from "../../types/response";

export async function getRoomList(): Promise<RoomListResponse> {
  try {
    const response : RoomListResponse = await QuizzleAPI.get("/api/v1/rooms");
    return response;
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
  password = "",
  isPrivate = false
}: {
  title: string;
  capacity?: number;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  mainCategory?: string;
  subCategory?: string;
  password?: string;
  isPrivate?: boolean;
}) {
  try {
    const response = await QuizzleAPI.post("/api/v1/rooms", {
      title,
      capacity,
      difficulty,
      mainCategory,
      subCategory,
      password,
      isPrivate
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function startGame(roomId: string) {
  try {
    const response = await QuizzleAPI.post(`/api/v1/rooms/${roomId}/start`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function readyGame(roomId: string) {
  try {
    const response = await QuizzleAPI.post(`/api/v1/rooms/${roomId}/ready`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function leaveRoom(roomId: string) {
  try {
    const response = await QuizzleAPI.post(`/api/v1/rooms/${roomId}/leave`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function joinRoom(roomId: string, password?: string) {
  try {
    const response = await QuizzleAPI.post(`/api/v1//rooms/${roomId}/join`, {
      password
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
