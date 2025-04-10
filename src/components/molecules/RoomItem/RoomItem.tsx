"use client"

import type React from "react"
import Button from "../../atoms/Button/Button"
import { useDisclosure } from "@chakra-ui/react";
import { joinRoom } from "../../../services/remote/room";
import { useContext } from "react";
import { RouteDispatchContext } from "../../provider/RouteProvider";
import PasswordInputModal from "../../modal/PasswordInputModal";

export interface QuizItemProps {
    roomId: string;
    title: string;
    maxMember: number;
    member: number;
    isPrivate: boolean;
}

const RoomItem: React.FC<QuizItemProps> = ({ roomId, title, maxMember, member, isPrivate }: QuizItemProps) => {

    const roomItemStyle = {
        display: "flex",
        flexDirection: "row" as const,
        justifyContent: "space-between" as const,
        alignItems: "center" as const,
        padding: "1rem",
        borderBottom: "1px solid #dee2e6",
    }

    const contentStyle = {
        display: "flex",
        flexDirection: "row" as const,
        flex: 1,
        gap: 10
    }

    const titleStyle = {
        marginBottom: "0.25rem",
        fontSize: "1.25rem",
    }

    const actionsStyle = {
        display: "flex",
        flexDirection: "row" as const,
        justifyContent: "flex-end" as const,
        alignItems: "center" as const,
        gap: "0.75rem",
    }

    const scoreStyle = {
        fontWeight: 500,
        color: "#495057",
    }

    const privateStyle = {
        fontSize: "0.875rem",
        color: "#495057",
    }

    const routerDispatch = useContext(RouteDispatchContext)

    const {
        open: isPasswordInputModalOpen,
        onClose: onClosePasswordInputModal,
        onOpen: onOpenPasswordInputModal,
    } = useDisclosure();

    const handleRoomJoin = async (roomId: string, password?: string) => {
        if(isPrivate && !isPasswordInputModalOpen) {
            onOpenPasswordInputModal()
            return ;
        }

        await joinRoom(roomId, password);
        
        routerDispatch("GAME_ROOM", {roomId})
    }

    return (
        <div style={roomItemStyle}>
            <div style={contentStyle}>
                <h3 style={titleStyle}>{title}</h3>
            </div>
            <div style={actionsStyle}>
                {isPrivate && <div style={privateStyle}>비공개</div>}
                {<div style={scoreStyle}>{`${member} / ${maxMember}`}</div>}
                <Button onClick={() => handleRoomJoin(roomId)}>참가</Button>
            </div>
            {isPasswordInputModalOpen && <PasswordInputModal isOpen={isPasswordInputModalOpen} onClose={onClosePasswordInputModal} handleJoin={handleRoomJoin} roomId={roomId}/>}
        </div>
    )
}

export default RoomItem
