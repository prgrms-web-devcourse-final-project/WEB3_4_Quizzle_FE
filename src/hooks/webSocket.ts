import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { WebSocketClient } from "../services/socket/socket";
import { ChatMessageDTO, RoomMessageDTO, WebSocketQuizSubmitRequest, WebSocketQuizSubmitResponse } from "../services/socket/types.ts";

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
    enabled = true 
}: UseWebSocketProps) {
    const webSocket = useMemo(() => new WebSocketClient(), []);
    const [isConnected, setIsConnected] = useState(false);

    // 콜백 함수들을 ref로 관리
    const callbacksRef = useRef({
        onLobby,
        onLobbyChat,
        onLobbyUsers,
        onRoomChat,
        onRoomUpdate,
        onGameUpdate,
        onQuizUpdate
    });

    // 콜백 ref 업데이트
    useEffect(() => {
        callbacksRef.current = {
            onLobby,
            onLobbyChat,
            onLobbyUsers,
            onRoomChat,
            onRoomUpdate,
            onGameUpdate,
            onQuizUpdate
        };
    }, [onLobby, onLobbyChat, onLobbyUsers, onRoomChat, onRoomUpdate, onGameUpdate, onQuizUpdate]);

    useEffect(() => {
        if (!enabled) {
            webSocket.disconnect();
            setIsConnected(false);
            return;
        }

        webSocket.connect(() => {
            setIsConnected(true);
            
            // 로비 관련 구독
            if (callbacksRef.current.onLobby) {
                webSocket.subscribeLobby(callbacksRef.current.onLobby);
            }

            if (callbacksRef.current.onLobbyChat) {
                webSocket.subscribeLobbyChat(callbacksRef.current.onLobbyChat);
            }
            
            if (callbacksRef.current.onLobbyUsers) {
                webSocket.subscribeLobbyUsers(callbacksRef.current.onLobbyUsers);
            }

            // 방 관련 구독
            if (roomId) {
                if (callbacksRef.current.onRoomChat) {
                    webSocket.subscribeRoomChat(roomId, callbacksRef.current.onRoomChat);
                }
                
                if (callbacksRef.current.onRoomUpdate) {
                    webSocket.subscribeRoomUpdates(roomId, callbacksRef.current.onRoomUpdate);
                }

                if (callbacksRef.current.onGameUpdate) {
                    webSocket.subscribeGameUpdates(roomId, callbacksRef.current.onGameUpdate);
                }
            }

            // 퀴즈 관련 구독
            if (quizId && callbacksRef.current.onQuizUpdate) {
                webSocket.subscribeQuizUpdates(quizId, callbacksRef.current.onQuizUpdate);
            }
        });

        return () => {
            webSocket.disconnect();
            setIsConnected(false);
        };
    }, [webSocket, enabled, roomId, quizId]); // 콜백 의존성 제거

    // 로비 관련 메서드
    const sendLobbyChatMessage = useCallback((message: ChatMessageDTO) => {
        if (!isConnected) {
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
        if (!isConnected) {
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
        if (!isConnected) {
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
        if (!isConnected) {
            throw new Error('WebSocket is not connected');
        }
        try {
            webSocket.startGame(roomId);
        } catch (error) {
            console.error('Failed to start game:', error);
            throw error;
        }
    }, [isConnected, webSocket]);

    const submitQuizAnswer = useCallback((quizId: string, answer: WebSocketQuizSubmitRequest) => {
        if (!isConnected) {
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
        webSocket,
        // 로비 관련
        sendLobbyChatMessage,
        // 방 관련
        sendRoomChatMessage,
        sendRoomMessage,
        // 게임 관련
        startGame,
        submitQuizAnswer
    };
}