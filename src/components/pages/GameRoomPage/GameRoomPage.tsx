import type React from "react"
import {useState} from "react"
import AppTemplate from "../../templates/AppTemplate/AppTemplate.tsx";
import Button, {ButtonVariant} from "../../atoms/Button/Button.tsx";
import PlayerList from "../../organisms/PlayerList/PlayerList.tsx";
import GameRoomHeader from "../../organisms/Headers/QuizHeader/GameRoomHeader.tsx";
import "./GameRoomPage.scss"

const GameRoomPage: React.FC = () => {
    const [isReady, setIsReady] = useState(false);
    const [isHost] = useState(false);

    // Mock data
    const roomId = "12345"
    const players = [
        {
            id: "1",
            name: "Player 1",
            avatar: "/assets/avatars/avatar1.png",
            isReady: true,
        },
        {
            id: "2",
            name: "Player 2",
            avatar: "/assets/avatars/avatar2.png",
            isReady: true,
        },
        {
            id: "3",
            name: "Player 3",
            avatar: "/assets/avatars/avatar3.png",
            isReady: false,
        },
        {
            id: "4",
            name: "Player 4",
            avatar: "/assets/avatars/avatar4.png",
            isReady: true,
        },
    ]

    const handleReady = () => {
        setIsReady(!isReady)
    }

    const handleStart = () => {
        console.log("Game started")
    }

    const handleLeave = () => {
        console.log("Left room")
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
        <AppTemplate header={<GameRoomHeader roomId={roomId} onStart={handleStart} onLeave={handleLeave}/>}
                     content={<div className="game-room-template__content">
                         <div className="game-room-template__players">
                             <PlayerList title="플레이어" type="grid" players={players} maxPlayers={8}/>
                         </div>
                         <div className="game-room-template__settings">
                             <div className="game-room-template__settings-card">
                                 <h3>게임 설정</h3>
                                 <div className="game-room-template__setting-item">
                                     <span>주제</span>
                                     <span>상식 퀴즈</span>
                                 </div>
                                 <div className="game-room-template__setting-item">
                                     <span>질문 수</span>
                                     <span>10 개</span>
                                 </div>
                                 <div className="game-room-template__setting-item">
                                     <span>제한 시간</span>
                                     <span>15 초</span>
                                 </div>
                                 <div className="game-room-template__setting-item">
                                     <span>난이도</span>
                                     <span>어려움</span>
                                 </div>
                             </div>
                             {renderButton(isHost, isReady)}
                         </div>
                     </div>}/>
    )
}

export default GameRoomPage;

