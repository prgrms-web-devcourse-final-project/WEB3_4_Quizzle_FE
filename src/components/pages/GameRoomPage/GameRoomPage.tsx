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
import { Button } from "@chakra-ui/react";
import { ChatMessageDTO, RoomMessageDTO } from "../../../services/socket/types.ts";
import useWebSocket from "../../../hooks/webSocket.ts";

const GameRoomPage: React.FC<{roomId: string}> = ({roomId}) => {
    const dispatchRouter = useContext(RouteDispatchContext)
    const {user: me, isLoading: isMeLoading} = useUser();
    
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
        refetchRoom();
    }, [me, refetchRoom]);

    const { isConnected, startGame: wsStartGame } = useWebSocket({
        roomId,
        onRoomChat: handleReceiveRoomChat,
        onRoomUpdate: handleReceiveRoomUpdates,
        enabled: !!me
    });

    const handleStart = useCallback(async() => {
        if (!me || !isConnected) return;
        await startGame(roomId);
        wsStartGame(roomId);
        dispatchRouter("QUIZ", {roomId})
    }, [dispatchRouter, isConnected, me, roomId, wsStartGame]);

    if (!room || isMeLoading) {
        return <div>로딩중...</div>
    }

    const isMeReady = room?.readyPlayers.includes(me?.id ?? 0);
    const isHost = room.ownerId === me?.id;

    const handleReady = async () => {
        await readyGame(roomId);
        refetchRoom();
    }

    const handleLeave = async () => {
        await leaveRoom(roomId)
        dispatchRouter("LOBBY")
    }

    return (
        <AppTemplate header={<GameRoomHeader roomId={String(room.id)} onStart={handleStart} onLeave={handleLeave}/>}
                     content={<div className="game-room-template__content">
                         <div className="game-room-template__players">
                             <PlayerList title="플레이어" type="grid" playerIds={room.players} readyPlayers={room.readyPlayers} maxPlayers={room.capacity} ownerId={room.ownerId}/>
                         </div>
                         <div className="game-room-template__settings">
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
                             {!isHost && <Button bgColor="quizzle.primary" color="white" w="full" h="200px" fontSize="3xl" rounded={"20px"} onClick={handleReady}>{isMeReady ? "준비취소" : "준비하기"}</Button>}
                             {isHost && <Button bgColor="quizzle.primary" color="white" w="full" h="200px" fontSize="3xl" rounded={"20px"} onClick={handleStart} disabled={room.readyPlayers.length !== room.players.length - 1 || room.players.length < 2}>게임 시작</Button>}
                         </div>
                     </div>}/>
    )
}

export default GameRoomPage;

