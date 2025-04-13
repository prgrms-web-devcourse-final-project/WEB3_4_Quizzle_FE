import { useState, useRef, useCallback } from "react";
import {
    Box,
    Container,
    VStack,
    HStack,
    Input,
    Button,
    Text,
    Flex,
    Stack,
} from "@chakra-ui/react";
import { ChatMessageDTO } from "../../../services/socket/types";
import Avatar from "../../atoms/Avatar/Avatar";
import useUser from "../../../hooks/user";
import { getUser } from "../../../services/remote/user";
import { useQuery } from "@tanstack/react-query";
import useWebSocket from "../../../hooks/webSocket";

function ChatMessage({ message }: { message: ChatMessageDTO }) {
    const { user: me, isLoading: isMeLoading } = useUser();

    const { data: sender, isLoading: isSenderLoading } = useQuery({
        queryKey: ["user", message.senderId],
        queryFn: () => getUser(Number(message.senderId)),
    })

    const isMine = Number(message.senderId) === Number(me?.id);
    
    if (isMeLoading || isSenderLoading) {
        return <div>Loading...</div>
    }

    return (
        <Flex justifyContent={isMine ? "flex-end" : "flex-start"}>
            <HStack align={"top"} flexDirection={isMine ? "row-reverse" : "row"}>
                <Avatar src={sender?.avatarUrl} />
                <Stack maxW="70%"
                        w="full">
                    <Text textAlign={"center"} fontSize="xs" color={"gray.500"} my={1}>{sender?.nickname}</Text>
                    <Box
                        w="full"
                        bg={isMine ? "blue.500" : "gray.100"}
                        color={isMine ? "white" : undefined}
                        p={3}
                        borderRadius="lg"
                        >
                        <Text textAlign={"left"}>{message.content}</Text>
                    </Box>
                </Stack>
            </HStack>
        </Flex>
    )
}

export default function LobbyChat() {
    const [messages, setMessages] = useState<ChatMessageDTO[]>([]);
    const [messageInput, setMessageInput] = useState<string>("");
    const messageListRef = useRef<HTMLDivElement>(null);
    const { user: me } = useUser();
    
    const handleReceiveMessage = useCallback((message: ChatMessageDTO) => {
        console.log("[LobbyChat] receive message:", message);
        setMessages((prev) => [...prev, message]);
        setTimeout(() => {
            messageListRef.current?.scrollTo({
                top: messageListRef.current?.scrollHeight,
                behavior: "smooth"
            });
        }, 100);
    }, []);

    const { isConnected, sendLobbyChatMessage } = useWebSocket({
        onLobbyChat: handleReceiveMessage,
    });

    console.log("[LobbyChat] isConnected:", isConnected);
    
    const handleSendMessage = (message: string) => {
        if (!me || !isConnected || !message.trim()) {
            return;
        }
        
        try {
            sendLobbyChatMessage({
                type: "CHAT",
                content: message,
                senderId: me?.id,
                senderName: me?.nickname,
                timestamp: Date.now(),
            });
            setMessageInput("");
        } catch (error) {
            console.error("메시지 전송 실패:", error);
        }
    }
    
    return (
        <Container maxW="container.md" h="100%">
            <Box
                h="600px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                bg="white"
                boxShadow="base"
            >
                <VStack ref={messageListRef} h="calc(100% - 60px)" p={4} gap={4} overflowY="auto" align="stretch">
                    {messages.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                    ))}
                </VStack>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(messageInput);
                }}>
                    <HStack p={4} borderTopWidth="1px" gap={2} h="60px">
                        <Input
                            placeholder={isConnected ? "메시지를 입력하세요" : "연결 중..."}
                            size="md"
                            value={messageInput}
                            // disabled={!isConnected}
                            onChange={(e) => setMessageInput(e.target.value)}
                        />
                        <Button 
                            type="submit"
                            bgColor={"quizzle.primary"}
                            color={"white"}
                            px={6} 
                            // disabled={!isConnected}
                        >
                            전송
                        </Button>
                    </HStack>
                </form>
            </Box>
        </Container>
    );
}