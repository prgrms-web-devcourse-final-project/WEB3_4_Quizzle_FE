import type React from "react"
import { useQuery } from "@tanstack/react-query";
import AppTemplate from "../../templates/AppTemplate/AppTemplate.tsx";
import LobbyHeader from "../../organisms/Headers/LobbyHeader/LobbyHeader.tsx";
import RoomList from "../../organisms/RoomList/RoomList.tsx";
import FriendList from "../../organisms/FriendList/FriendList.tsx";
import "./LobbyPage.scss"
import { getRoomList } from "../../../services/remote/room.ts";
import { mockRoomList } from "../../../mock/roomList.ts";
import { mockFriendList } from "../../../mock/user.ts";
import { getFriendList, getFriendRequestList } from "../../../services/remote/friend.ts";
import FriendRequestList from "../../organisms/FirendRequestList.tsx";
import { Stack } from "@chakra-ui/react";
import LobbyChat from "../../organisms/Chat/LobbyChat.tsx";
import useWebSocket from "../../../hooks/webSocket.ts";
import { useCallback } from "react";

const LobbyPage: React.FC = () => {
    const { data: roomListResponse, isLoading: isRoomListLoading, refetch: refetchRoomList } = useQuery({
        queryKey: ["roomList"],
        queryFn: getRoomList,
        refetchOnMount: true,
        staleTime: 0,
    })

    const { data: friendListResponse, isLoading: isFriendListLoading } = useQuery({
        queryKey: ["friendList"],
        queryFn: getFriendList,
        refetchOnMount: true,
        staleTime: 0,
    })

    const { data: firendRequestedList, isLoading: isFriendRequestListLoading } = useQuery({
        queryKey: ["friendRequestList"],
        queryFn: getFriendRequestList,
        refetchOnMount: true,
        staleTime: 0,
    })

    const handleReceiveLobbyMessage = useCallback((message: string) => {
        console.log("[LobbyPage] receive message:", message);
        const [type, roomId] = message.split(":");
        if (type === "ROOM_CREATED") {
            console.log("[LobbyPage] room created:", roomId);
            refetchRoomList(); // TODO- room하나만 추가
        } else if (type === "ROOM_DELETED") {
            console.log("[LobbyPage] room deleted:", roomId);
            refetchRoomList(); // TODO- room하나만 삭제
        }
    }, []);

    const handleReceiveLobbyUsersMessage = useCallback((message: string) => {
        console.log("[LobbyPage] receive message:", message);
    }, []);

    useWebSocket({
        onLobby: handleReceiveLobbyMessage,
        onLobbyUsers: handleReceiveLobbyUsersMessage,
    })

    if (isRoomListLoading || isFriendListLoading || isFriendRequestListLoading) {
        return <div>Loading...</div>
    }

    return (
        <AppTemplate header={<LobbyHeader/>} content={
            <div className="lobby-contents-container">
                <div className="lobby-roomlist-container">
                    <RoomList roomList={roomListResponse ?? mockRoomList} />
                </div>
                <Stack w={"300px"}>
                    {firendRequestedList.length > 0 && <FriendRequestList friendRequests={firendRequestedList}/>}
                    <FriendList players={friendListResponse ?? mockFriendList}/>
                    <LobbyChat />
                </Stack>
            </div>
        }/>
    )
}

export default LobbyPage

