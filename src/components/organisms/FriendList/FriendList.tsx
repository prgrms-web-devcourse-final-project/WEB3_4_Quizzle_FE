import type React from "react"
import Card from "../../atoms/Card/Card"
import FriendItem from "../../molecules/FriendItem/FriendItem.tsx";
import "./FriendList.scss"
import { PlayerListResponse } from "../../../types/response.ts";


export interface PlayerListProps {
    players: PlayerListResponse
}

const FriendList: React.FC<PlayerListProps> = ({players}) => {
    const titleStyle = {
        padding: "1rem",
        textAlign: "left" as const,
        borderBottom: "1px solid #dee2e6",
        marginBottom: 0,
    }

    const itemsStyle = {
        padding: "1rem",
        display: "grid",
        gap: "0.75rem",
        overflowY: "scroll" as const,
    }

    return (
        <Card className="friend-list">
            <h2 style={titleStyle}>{"친구 목록"}</h2>
            <div style={itemsStyle}>
                {players.map((player, index) => (
                    <FriendItem
                        key={player.memberId}
                        name={player.nickname}
                        level={player.level}
                        isOnline={player.isOnline}
                        acceptedAt={player.acceptedAt}
                        rank={index + 1}
                    />
                ))}
            </div>
        </Card>
    )
}

export default FriendList

