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
import { getFriendList } from "../../../services/remote/user.ts";
const LobbyPage: React.FC = () => {

    const { data : roomList } = useQuery({
        queryKey: ["roomList"],
        queryFn: getRoomList
    })

    const { data: friendList } = useQuery({
        queryKey: ["friendList"],
        queryFn: getFriendList
    })

    return (
        <AppTemplate header={<LobbyHeader/>} content={
            <div className="lobby-contents-container">
                <div className="lobby-roomlist-container">
                    <RoomList roomList={[]}/>
                </div>
                <div className="lobby-friendlist-container">
                    <FriendList players={[]}/>
                </div>
            </div>
        }/>
    )
}

export default LobbyPage

