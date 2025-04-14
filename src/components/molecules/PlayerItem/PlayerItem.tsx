import type React from "react"
import Avatar from "../../atoms/Avatar/Avatar"
import { useQuery } from "@tanstack/react-query"
import { getUser } from "../../../services/remote/user"
import { useState } from "react"
import { Button } from "@chakra-ui/react"
import useUser from "../../../hooks/user"
import { sendFriendRequest } from "../../../services/remote/friend"

export interface PlayerItemProps {
    playerId: number
    isOwner: boolean
    isReady: boolean
}

const PlayerItem: React.FC<PlayerItemProps> = ({playerId, isOwner, isReady}) => {

    const {data: user, isLoading} = useQuery({
        queryKey: ["user", playerId],
        queryFn: () => getUser(playerId)
    })
    
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
    
    const infoStyle = {
        flex: 1,
    }
    
    const nameStyle = {
        color: isReady ? "green" : "#adb5bd",
        fontSize: "0.875rem",
        fontWeight: 500,
    }

    const scoreStyle = {
        fontWeight: "bold" as const,
        color: "#5e3bee",
    }
    
    const [showTooltip, setShowTooltip] = useState(false);
    
    const tooltipStyle: React.CSSProperties = {
        position: "absolute",
        backgroundColor: "white", 
        padding: "8px",
        width: "150px",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        border: "1px solid #dee2e6",
        zIndex: 1000,
        cursor: "pointer"
    }

    const {user: me, isLoading: isMeLoading} = useUser();

    
    const handleAvatarClick = () => {
        if (me.id === playerId) {
            return;
        }
        setShowTooltip(!showTooltip);
    }
    
    const handleCloseTooltip = () => {
        setShowTooltip(false);
    }
    const handleAddFriend = () => {
        sendFriendRequest(playerId)
        setShowTooltip(false);
    }

    if (isLoading || isMeLoading) {
        return <div>Loading...</div>
    }
    return (
        <div style={playerItemStyle}>
            <div style={{ position: "relative" }}>
                <Avatar 
                    src={user.avatarUrl} 
                    alt={user.nickname} 
                    size="md" 
                    style={isOwner ? { border: "2px solid #5e3bee" } : undefined}
                    onClick={handleAvatarClick}
                />
                {showTooltip && (
                    <div style={tooltipStyle}>
                        <Button bgColor={"quizzle.primary"} color={"white"} w={"full"} onClick={handleAddFriend}>친구 추가하기</Button>
                        <Button bgColor={"quizzle.gray.200"} color={"white"} w={"full"} mt={2} onClick={handleCloseTooltip}>닫기</Button>
                    </div>
                )}
            </div>
            <div style={infoStyle}>
                <div style={nameStyle} >{user.nickname}</div>
            </div>
            {user.score !== undefined && <div style={scoreStyle}>{user.score}</div>}
        </div>
    )
}

export default PlayerItem

