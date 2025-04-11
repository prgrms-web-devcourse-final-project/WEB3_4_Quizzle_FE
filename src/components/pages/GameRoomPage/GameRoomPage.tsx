import type React from "react"
import {useContext, useState} from "react"
import AppTemplate from "../../templates/AppTemplate/AppTemplate.tsx";
import Button, {ButtonVariant} from "../../atoms/Button/Button.tsx";
import PlayerList from "../../organisms/PlayerList/PlayerList.tsx";
import GameRoomHeader from "../../organisms/Headers/QuizHeader/GameRoomHeader.tsx";
import "./GameRoomPage.scss"
import { getRoom, leaveRoom } from "../../../services/remote/room.ts";
import { RouteDispatchContext } from "../../provider/RouteProvider.tsx";
import { useQuery } from "@tanstack/react-query";

const GameRoomPage: React.FC<{roomId: string}> = ({roomId}) => {
    const [isReady, setIsReady] = useState(false);
    const isHost = true;
    const dispatchRouter = useContext(RouteDispatchContext)

    const {data: room} = useQuery({
        queryKey: ["room", roomId],
        queryFn: () => getRoom(roomId)
    })

    if (!room) {
        return <div>로딩중...</div>
    }

    const handleReady = () => {
        setIsReady(!isReady)
    }

    const handleStart = () => {
        console.log("Game started")
    }

    const handleLeave = async () => {
        await leaveRoom(roomId)
        dispatchRouter("LOBBY")
    }

    const renderButton = (isHost?: boolean, isReady?: boolean) => {
        const buttonProps = {
            variant: "primary" as ButtonVariant,
            buttonText: "준비하기",
            onClick: handleReady
        }

        if (isHost) {
            buttonProps.buttonText = "시작하기";
            buttonProps.onClick = handleStart;
        } else if (isReady) {
            buttonProps.buttonText = "준비완료";
            buttonProps.variant = "secondary";
        }

        return <Button size="lg" className="game-room-template__ready-button" onClick={buttonProps.onClick}
                       variant={buttonProps.variant}>
            {buttonProps.buttonText}
        </Button>
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
                             {renderButton(isHost, isReady)}
                         </div>
                     </div>}/>
    )
}

export default GameRoomPage;

