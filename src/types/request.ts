import { AnswerType, MainCategory, SubCategory } from "./room";

export type RoomUpdateRequest = {
    title: string;
    capacity: number;
    difficulty: "EASY" | "NORMAL" | "HARD";
    mainCategory: MainCategory;
    subCategory: SubCategory;
    isPrivate: boolean;
    password?: string | null;
};

export type QuizGenerateRequest = {
    mainCategory: MainCategory;
    subCategory: SubCategory;
    answerType: AnswerType;
    problemCount: number;
    difficulty: "EASY" | "NORMAL" | "HARD";
};