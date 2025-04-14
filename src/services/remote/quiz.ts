import { QuizGenerateRequest } from "../../types/request";
import { QuizzleAPI } from "../api";

export async function generateQuiz(request: QuizGenerateRequest) {
    try {
        const response = await QuizzleAPI.post(`/api/v1/quiz/generate`, request);
        // @ts-expect-error response type from QuizzleAPI is not properly typed
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
