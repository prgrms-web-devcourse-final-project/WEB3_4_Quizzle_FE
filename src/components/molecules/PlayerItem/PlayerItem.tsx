import type React from "react"
import Avatar from "../../atoms/Avatar/Avatar"
import { useQuery } from "@tanstack/react-query"
import { getUser } from "../../../services/remote/user"
// Remove SCSS import
// import './FriendItem.scss';

export interface PlayerItemProps {
    userId: string
    name: string
    avatar?: string
    isReady?: boolean
    score?: number
    rank?: number
}

const PlayerItem: React.FC<PlayerItemProps> = ({userId, name, avatar, isReady = false, score, rank}) => {

    const {data: user} = useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUser(userId)
    })

    console.log("user :", user)
    const playerItemStyle = {
        display: "flex",
        flexDirection: "row" as const,
        justifyContent: "flex-start" as const,
        alignItems: "center" as const,
        padding: "0.75rem",
        gap: "0.75rem",
        borderColor: "#000000",
        borderRadius: "0.5rem",
        backgroundColor: "#ffffff",
    }

    const rankStyle = {
        fontWeight: "bold" as const,
        minWidth: "24px",
    }

    const infoStyle = {
        flex: 1,
    }

    const nameStyle = {
        fontWeight: 500,
    }

    const statusStyle = {
        fontSize: "0.875rem",
        color: isReady ? "green" : "#adb5bd",
    }

    const scoreStyle = {
        fontWeight: "bold" as const,
        color: "#5e3bee",
    }

    return (
        <div style={playerItemStyle}>
            {rank && <div style={rankStyle}>{rank}</div>}
            <Avatar src={avatar} alt={name} size="md"/>
            <div style={infoStyle}>
                <div style={nameStyle}>{name}</div>
                {isReady !== undefined && <div style={statusStyle}>{isReady ? "Ready" : "Not Ready"}</div>}
            </div>
            {score !== undefined && <div style={scoreStyle}>{score}</div>}
        </div>
    )
}

export default PlayerItem

