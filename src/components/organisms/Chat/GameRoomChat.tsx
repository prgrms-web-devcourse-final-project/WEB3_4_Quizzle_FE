import { useEffect, useMemo } from "react";
import { WebSocketClient } from "../../../services/socket/socket";

export default function GameRoomChat() {

    const webSocket = useMemo(() => new WebSocketClient(), []);

    useEffect(() => {
        webSocket.connect(() => {
            // 구독 시작
            webSocket.subscribeLobbyChat((message) => {
                console.log("[LobbyPage] chat message:", message);
            });
    
            webSocket.subscribeLobbyUsers((message) => {
                console.log("[LobbyPage] users update:", message);
            });
        });
    
        // cleanup: 구독 해제 후 연결 종료
        return () => {
            webSocket.disconnect();
        };
    }, [webSocket]);
    return (
        <div>
            <h1>GameRoomChat</h1>
        </div>
    )
}