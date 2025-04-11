import { QuizzleAPI } from "../api";

export async function sendFriendRequest(userId: number) {
    try {
        const response = await QuizzleAPI.post(`/api/v1/friends/${userId}/request`);
        // @ts-expect-error response type from QuizzleAPI is not properly typed
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getFriendList() {
    try {
        const response = await QuizzleAPI.get("/api/v1/friends");
        // @ts-expect-error response type from QuizzleAPI is not properly typed
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getFriendRequestList() {
    try {
        const response = await QuizzleAPI.get("/api/v1/friends/requests");
        // @ts-expect-error response type from QuizzleAPI is not properly typed
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}   

export async function acceptFriendRequest(userId: number) {
    try {
        const response = await QuizzleAPI.post(`/api/v1/friends/${userId}/accept`);
        // @ts-expect-error response type from QuizzleAPI is not properly typed
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function rejectFriendRequest(userId: number) {
    try {
        const response = await QuizzleAPI.post(`/api/v1/friends/${userId}/reject`);
        // @ts-expect-error response type from QuizzleAPI is not properly typed
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}