import type React from "react"
import {useContext, useCallback} from "react"
import AppTemplate from "../../templates/AppTemplate/AppTemplate.tsx";
import PlayerList from "../../organisms/PlayerList/PlayerList.tsx";
import GameRoomHeader from "../../organisms/Headers/QuizHeader/GameRoomHeader.tsx";
import "./GameRoomPage.scss"
import { getRoom, leaveRoom, readyGame, startGame } from "../../../services/remote/room.ts";
import { RouteDispatchContext } from "../../provider/RouteProvider.tsx";
import { useQuery } from "@tanstack/react-query";
import useUser from "../../../hooks/user.ts";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { ChatMessageDTO, RoomMessageDTO, WebSocketQuizSubmitResponse } from "../../../services/socket/types.ts";
import useWebSocket from "../../../hooks/webSocket.ts";
import UpdateRoomInfoDialog from "../../modal/UpdateRoomInfoDialog.tsx";
import { generateQuiz } from "../../../services/remote/quiz.ts";

const GameRoomPage: React.FC<{roomId: string}> = ({roomId}) => {
    const dispatchRouter = useContext(RouteDispatchContext)
    const {user: me, isLoading: isMeLoading} = useUser();

    const {open: isUpdateRoomInfoOpen, onOpen: onUpdateRoomInfoOpen, onClose: onUpdateRoomInfoClose} = useDisclosure();
    
    const {data: room, refetch: refetchRoom} = useQuery({
        queryKey: ["room", roomId],
        queryFn: () => getRoom(roomId)
    })

    const handleReceiveRoomChat = useCallback((message: ChatMessageDTO) => {
        if (!me) return;
        console.log("[GameRoomPage]receive room chat : ", message)
        refetchRoom();
    }, [me, refetchRoom]);

    const handleReceiveRoomUpdates = useCallback((message: RoomMessageDTO) => {
        if (!me) return;
        console.log("[GameRoomPage]receive room updates : ", message)
        if (message.type === 'GAME_START') {
            return;
        }
        refetchRoom();
    }, [me, refetchRoom]);

    const handleReceiveQuizUpdates = useCallback((message: WebSocketQuizSubmitResponse) => {
        if (!me) return;
        console.log("[GameRoomPage]receive quiz updates : ", message)
        refetchRoom();
    }, [me, refetchRoom]);

    const handleReceiveGameChat = useCallback((message: ChatMessageDTO) => {
        console.log("[GameRoomPage]receive game chat : ", message)
        if (!me) return;
        try {
            const data = JSON.parse(message.content);
            if (data.quiz) {
                dispatchRouter("QUIZ", {roomId, quiz: data.quiz})
            } else {
                console.warn("[GameRoomPage] Received game chat message without quiz data:", message);
            }
        } catch (error) {
            console.error("[GameRoomPage] Failed to parse game chat message:", error);
        }
    }, [me, dispatchRouter, roomId]);

    const { isConnected, startGame: wsStartGame, sendGameChatMessage } = useWebSocket({
        roomId,
        onRoomChat: handleReceiveRoomChat,
        onRoomUpdate: handleReceiveRoomUpdates,
        onQuizUpdate: handleReceiveQuizUpdates,
        onGameChat: handleReceiveGameChat,
        enabled: !!me
    });

    const isMeReady = room?.readyPlayers?.includes(me?.id ?? 0);
    const isHost = room?.ownerId === me?.id;

    const handleStart = useCallback(async() => {
        if (!me || !isConnected || !isHost || !room) return;

        const quiz = await generateQuiz({
            mainCategory: room.mainCategory,
            subCategory: room.subCategory,
            answerType: room.answerType,
            problemCount: 10,
            difficulty: room.difficulty
        })

        console.log("[GameRoomPage]Generated Quiz : ", quiz)
        await startGame(roomId);
        wsStartGame(roomId);
        sendGameChatMessage(roomId, {
            type: "CHAT",
            content: JSON.stringify(
                quiz
        ),
            senderId: me.id,
            senderName: me.nickname,
            timestamp: Date.now()
        })
    }, [me, isConnected, isHost, room, roomId, wsStartGame, sendGameChatMessage]);

    if (!room || isMeLoading) {
        return <div>로딩중...</div>
    }

    const handleReady = async () => {
        await readyGame(roomId);
        refetchRoom();
    }

    const handleLeave = async () => {
        await leaveRoom(roomId)
        dispatchRouter("LOBBY")
    }

    return (
        <>
        <AppTemplate header={<GameRoomHeader roomId={String(room.id)} onStart={handleStart} onLeave={handleLeave}/>}
                     content={<div className="game-room-template__content">
                         <div className="game-room-template__players">
                             <PlayerList title="플레이어" type="grid" playerIds={room.players} readyPlayers={room.readyPlayers} maxPlayers={room.capacity} ownerId={room.ownerId}/>
                         </div>
                         <div className="game-room-template__settings">
                            <Box position="relative">
                                {isHost && <Button position="absolute" top={2}right={2} bgColor="quizzle.primary" color="white" onClick={onUpdateRoomInfoOpen}>수정하기</Button>}
                                <div className="game-room-template__settings-card">
                                    <h3>게임 설정</h3>
                                    <div className="game-room-template__setting-item">
                                        <span>주제</span>
                                        <span>{room.mainCategory} - {room.subCategory}</span>
                                    </div>
                                    <div className="game-room-template__setting-item">
                                        <span>최대 인원</span>
                                        <span>{room.capacity} 명</span>
                                    </div>
                                    <div className="game-room-template__setting-item">
                                        <span>현재 인원</span>
                                        <span>{room.currentPlayers} 명</span>
                                    </div>
                                    <div className="game-room-template__setting-item">
                                        <span>난이도</span>
                                        <span>{room.difficulty}</span>
                                    </div>
                                </div>
                             </Box>
                             {!isHost && <Button bgColor="quizzle.primary" color="white" w="full" h="200px" fontSize="3xl" rounded={"20px"} onClick={handleReady}>{isMeReady ? "준비취소" : "준비하기"}</Button>}
                             {isHost && <Button bgColor="quizzle.primary" color="white" w="full" h="200px" fontSize="3xl" rounded={"20px"} onClick={handleStart} disabled={room.readyPlayers.length !== room.players.length - 1 || room.players.length < 2}>게임 시작</Button>}
                         </div>
                     </div>}/>
                     <UpdateRoomInfoDialog isOpen={isUpdateRoomInfoOpen} onClose={onUpdateRoomInfoClose} roomId={roomId} refetchRoom={refetchRoom}/>
                     </>
    )
}

export default GameRoomPage;

