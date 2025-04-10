import type React from "react"
import { useQuery } from "@tanstack/react-query";
import AppTemplate from "../../templates/AppTemplate/AppTemplate.tsx";
import LobbyHeader from "../../organisms/Headers/LobbyHeader/LobbyHeader.tsx";
import RoomList from "../../organisms/RoomList/RoomList.tsx";
import FriendList from "../../organisms/FriendList/FriendList.tsx";
import "./LobbyPage.scss"
import { getRoomList, joinRoom } from "../../../services/remote/room.ts";
import { getFriendList } from "../../../services/remote/user.ts";
import { mockRoomList } from "../../../mock/roomList.ts";
import { mockFriendList } from "../../../mock/user.ts";
import { RouteDispatchContext } from "../../provider/RouteProvider.tsx";
import { useContext } from "react";
import { Room } from "../../../types/response.ts";
import { useDialog, useDisclosure } from "@chakra-ui/react";
import PasswordInputModal from "../../modal/PasswordInputModal.tsx";
const LobbyPage: React.FC = () => {

    const routerDispatch = useContext(RouteDispatchContext)

    const { data: roomListResponse, isLoading: isRoomListLoading } = useQuery({
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

    if (isRoomListLoading || isFriendListLoading) {
        return <div>Loading...</div>
    }

    return (
        <AppTemplate header={<LobbyHeader/>} content={
            <div className="lobby-contents-container">
                <div className="lobby-roomlist-container">
                    <RoomList roomList={roomListResponse ?? mockRoomList} />
                </div>
                <div className="lobby-friendlist-container">
                    <FriendList players={friendListResponse ?? mockFriendList}/>
                </div>
            </div>
        }/>
    )
}

export default LobbyPage

