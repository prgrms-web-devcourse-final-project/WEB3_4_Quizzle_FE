import type React from "react"
import Avatar from "../../atoms/Avatar/Avatar"
// Remove SCSS import
// import './FriendItem.scss';

export interface PlayerItemProps {
    name: string
    avatar?: string
    level: number
    isOnline?: boolean
    score?: number
    rank?: number
    acceptedAt?: string
}

const FriendItem: React.FC<PlayerItemProps> = ({name, avatar, level, isOnline, acceptedAt, score}: PlayerItemProps) => {
    const renderOnlineText = (isOnline: boolean) => {
        if (isOnline) {
            return "온라인";
        }

        return "오프라인";
    }

    const getOnlineStyle = (online: boolean) => {
        let color = "#adb5bd";

        if (online) {
            color = "green";
        }

        return {
            fontSize: "0.875rem",
            color: color,
        }
    }


    const playerItemStyle = {
        display: "flex",
        flexDirection: "row" as const,
        justifyContent: "flex-start" as const,
        alignItems: "center" as const,
        padding: "0.75rem",
        gap: "0.75rem",
        borderRadius: "0.5rem",
        backgroundColor: "#ffffff",
    }

    const infoStyle = {
        flex: 1,
        textAlign: "left" as const
    }

    const nameStyle = {
        fontWeight: 500,
    }


    const scoreStyle = {
        fontWeight: "bold" as const,
        color: "#5e3bee",
    }

    return (
        <div style={playerItemStyle}>
            <Avatar src={avatar} alt={name} size="md"/>
            <div style={infoStyle}>
                <div style={nameStyle}>{name}</div>
                <div style={getOnlineStyle(isOnline?? false)}>{renderOnlineText(isOnline ?? false)}</div>
            </div>
            {score !== undefined && <div style={scoreStyle}>{score}</div>}
        </div>
    )
}

export default FriendItem

