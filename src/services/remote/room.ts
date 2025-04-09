import { QuizzleAPI } from "../api";


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
  console.log(title, capacity, difficulty, mainCategory, subCategory, password, isPrivate);
  try {
    const response = await QuizzleAPI.post("/rooms", {
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
