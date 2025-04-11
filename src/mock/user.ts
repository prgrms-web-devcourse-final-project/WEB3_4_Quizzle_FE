import { User } from "../types/response";

export const mockFriendList : User[] = [
    {
        memberId: 1,
        nickname: "퀴즈의신",
        level: 15,
        isOnline: true,
        acceptedAt: "2023-10-01"
    },
    {
        memberId: 2,
        nickname: "문제풀이왕",
        level: 8,
        isOnline: false,
        acceptedAt: "2023-09-15"
    },
    {
        memberId: 3,
        nickname: "지식챔피언",
        level: 12,
        isOnline: true,
        acceptedAt: "2023-08-30"
    },
    {
        memberId: 4,
        nickname: "상식박사",
        level: 5,
        isOnline: false,
        acceptedAt: "2023-10-10"
    }
]