import { QuizzleAPI } from "../api";

export async function logout() {
    try {
        const response = await QuizzleAPI.delete("/api/v1/system/logout", {});
        // @ts-expect-error response type from QuizzleAPI is not properly typed
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}