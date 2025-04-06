import type React from "react"
import AppTemplate from "../../templates/AppTemplate/AppTemplate.tsx";
import LobbyHeader from "../../organisms/Headers/LobbyHeader/LobbyHeader.tsx";
import RoomList from "../../organisms/RoomList/RoomList.tsx";
import FriendList from "../../organisms/FriendList/FriendList.tsx";
import "./LobbyPage.scss"

const LobbyPage: React.FC = () => {
    // Mock data
    const roomList = [
        {
            id: "1",
            title: "과학 퀴즈",
            description: "초보만 환영~",
            maxMember: 8,
            member: 4
        },
        {
            id: "2",
            title: "과학 퀴즈",
            description: "초보만 환영~",
            maxMember: 8,
            member: 4
        },
        {
            id: "3",
            title: "과학 퀴즈",
            description: "초보만 환영~",
            maxMember: 8,
            member: 4
        },
        {
            id: "4",
            title: "과학 퀴즈",
            description: "초보만 환영~",
            maxMember: 8,
            member: 4
        },
        {
            id: "5",
            title: "과학 퀴즈",
            description: "초보만 환영~",
            maxMember: 8,
            member: 4
        },
        {
            id: "6",
            title: "과학 퀴즈",
            description: "초보만 환영~",
            maxMember: 8,
            member: 4
        },
        {
            id: "7",
            title: "과학 퀴즈",
            description: "초보만 환영~",
            maxMember: 8,
            member: 4
        },
        {
            id: "4",
            title: "과학 퀴즈",
            description: "초보만 환영~",
            maxMember: 8,
            member: 4
        },
        {
            id: "5",
            title: "과학 퀴즈",
            description: "초보만 환영~",
            maxMember: 8,
            member: 4
        },
        {
            id: "6",
            title: "과학 퀴즈",
            description: "초보만 환영~",
            maxMember: 8,
            member: 4
        },
        {
            id: "7",
            title: "과학 퀴즈",
            description: "초보만 환영~",
            maxMember: 8,
            member: 4
        },
    ]

    const friends = [
        {
            id: "1",
            name: "김 아무개",
            avatar: "/assets/avatars/avatar1.png",
            online: true
        },
        {
            id: "2",
            name: "김 아무개",
            avatar: "/assets/avatars/avatar2.png",
            online: false
        },
        {
            id: "3",
            name: "김 아무개",
            avatar: "/assets/avatars/avatar3.png",
            online: false
        },
        {
            id: "4",
            name: "김 아무개",
            avatar: "/assets/avatars/avatar4.png",
            online: false
        },
        {
            id: "5",
            name: "김 아무개",
            avatar: "/assets/avatars/avatar5.png",
            online: false
        },
        {
            id: "6",
            name: "김 아무개",
            avatar: "/assets/avatars/avatar6.png",
            online: false
        },
        {
            id: "7",
            name: "김 아무개",
            avatar: "/assets/avatars/avatar7.png",
            online: false
        },
        {
            id: "8",
            name: "김 아무개",
            avatar: "/assets/avatars/avatar8.png",
            online: false
        },
    ]

    return (
        <AppTemplate header={<LobbyHeader/>} content={
            <div className="lobby-contents-container">
                <div className="lobby-roomlist-container">
                    <RoomList roomList={roomList}/>
                </div>
                <div className="lobby-friendlist-container">
                    <FriendList players={friends}/>
                </div>
            </div>
        }/>
    )
}

export default LobbyPage

