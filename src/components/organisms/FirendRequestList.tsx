
import { Box, Button, Flex, Heading, Separator, Stack, Text } from "@chakra-ui/react";
import { FriendRequest } from "../../types/response";
import Avatar from "../atoms/Avatar/Avatar";
import { getUser } from "../../services/remote/user";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { acceptFriendRequest, rejectFriendRequest } from "../../services/remote/friend";

function FriendRequestItem({ request }: { request: FriendRequest }) {
    const { data: user, isLoading } = useQuery({
        queryKey: ["user", request.memberId],
        queryFn: () => getUser(request.memberId),
    })

    const [showUserTooltip, setShowUserTooltip] = useState(false);


    const handleAcceptFriendRequest = () => {
        console.log("[FriendRequestItem] acceptFriendRequest : ", request.memberId)
        acceptFriendRequest(request.memberId)
    }

    const handleRejectFriendRequest = () => {
        console.log("[FriendRequestItem] rejectFriendRequest : ", request.memberId)
        rejectFriendRequest(request.memberId)
    }
    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Flex direction="row" key={request.memberId} w={"full"} position="relative">
            <Flex 
                flex={1} 
                gap={2} 
                alignItems="center" 
                cursor="pointer"
                onClick={() => setShowUserTooltip(true)}
            >
                <Avatar src={user.avatarUrl} />
                <Text>{user.nickname}</Text>
            </Flex>
            
            {showUserTooltip && (
                <Box 
                    position="absolute"
                    top="100%"
                    left="0"
                    bg="white"
                    p={4}
                    borderRadius="md"
                    boxShadow="md"
                    zIndex={1000}
                >
                    <Flex gap={2}>
                        <Button 
                            size="sm" 
                            bgColor="green"
                            color="white"
                            onClick={() => {
                                handleAcceptFriendRequest();
                                setShowUserTooltip(false);
                                window.location.reload();
                            }}
                        >
                            수락
                        </Button>
                        <Button 
                            size="sm" 
                            bgColor="red"
                            color="white"
                            onClick={() => {
                                handleRejectFriendRequest();
                                setShowUserTooltip(false);
                                window.location.reload();
                            }}
                        >
                            거절
                        </Button>
                        <Button 
                            size="sm" 
                            onClick={() => setShowUserTooltip(false)}
                            color="white"
                            bgColor="gray"
                        >
                            닫기
                        </Button>
                    </Flex>
                </Box>
            )}
        </Flex>
    )
}

export default function FriendRequestList({ friendRequests }: { friendRequests: FriendRequest[] }) {

    return (
        <Box bg="white" p={4} borderRadius={8} boxShadow="md">
            <Heading>{"친구 요청 목록"}</Heading>
            <Separator/>
            <Stack mt={4} gap={2}>
                {friendRequests.map((request) => {
                    return <FriendRequestItem key={request.memberId} request={request} />
                })}
            </Stack>
        </Box>
    )
}