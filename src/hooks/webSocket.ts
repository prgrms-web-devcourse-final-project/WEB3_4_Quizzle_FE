import { useEffect, useState, useCallback } from "react";
import { ChatMessageDTO, RoomMessageDTO, WebSocketQuizSubmitRequest, WebSocketQuizSubmitResponse } from "../services/socket/types.ts";
import { useWebSocketContext } from "../contexts/useWebSocketContext";

interface UseWebSocketProps {
    roomId?: string;
    quizId?: string;
    onLobby?: (message: string) => void;
    onLobbyChat?: (message: ChatMessageDTO) => void;
    onLobbyUsers?: (message: string) => void;
    onRoomChat?: (message: ChatMessageDTO) => void;
    onRoomUpdate?: (message: RoomMessageDTO) => void;
    onGameUpdate?: (message: RoomMessageDTO) => void;
    onQuizUpdate?: (message: WebSocketQuizSubmitResponse) => void;
    onGameChat?: (message: ChatMessageDTO) => void;
    enabled?: boolean;
}

export default function useWebSocket({ 
    roomId,
    quizId,
    onLobby,
    onLobbyChat,
    onLobbyUsers,
    onRoomChat,
    onRoomUpdate,
    onGameUpdate,
    onQuizUpdate,
    onGameChat,
    enabled = true 
}: UseWebSocketProps) {
    const { webSocket } = useWebSocketContext();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!webSocket || !enabled) {
            webSocket?.disconnect();
            setIsConnected(false);
            return;
        }

        webSocket.connect(() => {
            setIsConnected(true);
            
            // 로비 관련 구독
            if (onLobby) {
                webSocket.subscribeLobby(onLobby);
            }

            if (onLobbyChat) {
                webSocket.subscribeLobbyChat(onLobbyChat);
            }
            
            if (onLobbyUsers) {
                webSocket.subscribeLobbyUsers(onLobbyUsers);
            }

            // 방 관련 구독
            if (roomId) {
                if (onRoomChat) {
                    webSocket.subscribeRoomChat(roomId, onRoomChat);
                }
                
                if (onRoomUpdate) {
                    webSocket.subscribeRoomUpdates(roomId, onRoomUpdate);
                }

                if (onGameUpdate) {
                    webSocket.subscribeGameUpdates(roomId, onGameUpdate);
                }

                if (onGameChat) {
                    webSocket.subscribeGameChat(roomId, onGameChat);
                }
            }

            // 퀴즈 관련 구독
            if (quizId && onQuizUpdate) {
                webSocket.subscribeQuizUpdates(quizId, onQuizUpdate);
            }
        });

        return () => {
            webSocket.clearSubscriptions();
        };
    }, [
        webSocket,
        enabled,
        roomId,
        quizId,
        onLobby,
        onLobbyChat,
        onLobbyUsers,
        onRoomChat,
        onRoomUpdate,
        onGameUpdate,
        onQuizUpdate,
        onGameChat
    ]);

    // 로비 관련 메서드
    const sendLobbyChatMessage = useCallback((message: ChatMessageDTO) => {
        if (!isConnected || !webSocket) {
            throw new Error('WebSocket is not connected');
        }
        try {
            webSocket.sendLobbyChatMessage(message);
        } catch (error) {
            console.error('Failed to send lobby chat message:', error);
            throw error;
        }
    }, [isConnected, webSocket]);

    // 방 관련 메서드
    const sendRoomChatMessage = useCallback((roomId: string, message: ChatMessageDTO) => {
        if (!isConnected || !webSocket) {
            throw new Error('WebSocket is not connected');
        }
        try {
            webSocket.sendRoomChatMessage(roomId, message);
        } catch (error) {
            console.error('Failed to send room chat message:', error);
            throw error;
        }
    }, [isConnected, webSocket]);

    const sendRoomMessage = useCallback((roomId: string, message: RoomMessageDTO) => {
        if (!isConnected || !webSocket) {
            throw new Error('WebSocket is not connected');
        }
        try {
            webSocket.sendRoomMessage(roomId, message);
        } catch (error) {
            console.error('Failed to send room message:', error);
            throw error;
        }
    }, [isConnected, webSocket]);

    // 게임 관련 메서드
    const startGame = useCallback((roomId: string) => {
        if (!isConnected || !webSocket) {
            throw new Error('WebSocket is not connected');
        }
        try {
            webSocket.startGame(roomId);
        } catch (error) {
            console.error('Failed to start game:', error);
            throw error;
        }
    }, [isConnected, webSocket]);

    const sendGameChatMessage = useCallback((roomId: string, message: ChatMessageDTO) => {
        if (!isConnected || !webSocket) {
            throw new Error('WebSocket is not connected');
        }
        try {
            webSocket.sendGameChatMessage(roomId, message);
        } catch (error) {
            console.error('Failed to send game chat message:', error);
            throw error;
        }
    }, [isConnected, webSocket]);

    const submitQuizAnswer = useCallback((quizId: string, answer: WebSocketQuizSubmitRequest) => {
        if (!isConnected || !webSocket) {
            throw new Error('WebSocket is not connected');
        }
        try {
            webSocket.submitQuizAnswer(quizId, answer);
        } catch (error) {
            console.error('Failed to submit quiz answer:', error);
            throw error;
        }
    }, [isConnected, webSocket]);

    return {
        isConnected,
        // 로비 관련
        sendLobbyChatMessage,
        // 방 관련
        sendRoomChatMessage,
        sendRoomMessage,
        // 게임 관련
        startGame,
        submitQuizAnswer,
        sendGameChatMessage
    };
}