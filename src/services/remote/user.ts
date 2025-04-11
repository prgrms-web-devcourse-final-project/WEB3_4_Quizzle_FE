import { QuizzleAPI } from "../api";


export async function getUser(userId: number) {
    try {
        const response = await QuizzleAPI.get(`/api/v1/members/${userId}`);
        // @ts-expect-error response type from QuizzleAPI is not properly typed
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getMyInfo() {
    try {
        const response = await QuizzleAPI.get("/api/v1/members/me");
        // @ts-expect-error response type from QuizzleAPI is not properly typed
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function modifyMyNickname(nickname: string, userId: number) {
    try {
        const response = await QuizzleAPI.patch(`/api/v1/members/${userId}/nickname`, { nickname });
        // @ts-expect-error response type from QuizzleAPI is not properly typed
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function logout() {
    try {
        const response = await QuizzleAPI.delete("/api/v1/members", {});
        // @ts-expect-error response type from QuizzleAPI is not properly typed
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAvailableAvatarList(userId: number) {
    try {
        const response = await QuizzleAPI.get(`/api/v1/members/${userId}/avatar/available`);
        // @ts-expect-error response type from QuizzleAPI is not properly typed
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getOwnedAvatarList(userId: number) {
    try {
        const response = await QuizzleAPI.get(`/api/v1/members/${userId}/avatar/owned`);
        // @ts-expect-error response type from QuizzleAPI is not properly typed
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}