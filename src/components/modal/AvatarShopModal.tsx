import { Dialog, Grid, GridItem, Heading, Stack } from "@chakra-ui/react"
import useUser from "../../hooks/user";
import { useQuery } from "@tanstack/react-query";
import { getAvailableAvatarList, getOwnedAvatarList } from "../../services/remote/user";
import { Avatar as AvatarType } from "../../types/response";
import Avatar from "../atoms/Avatar/Avatar";

function AvatarShop({ availableAvatarList, ownedAvatarList }: { availableAvatarList: AvatarType[], ownedAvatarList: AvatarType[] }) {
    return (
        <Stack>
            <Stack>
                <Heading>보유 아바타</Heading>
                <Grid>
                    {ownedAvatarList.map((avatar) => (
                        <GridItem>
                            <Avatar src={avatar.url} />
                        </GridItem>
                    ))}
                </Grid>
            </Stack>
            <Stack>
                <Heading>구매 가능한 아바타</Heading>
                <Grid>
                    {availableAvatarList.map((avatar) => (
                        <GridItem>
                            <Avatar src={avatar.url} />
                        </GridItem>
                    ))}
                </Grid>
            </Stack>
        </Stack>
    )
}

export default function AvatarShopModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {

    const { user: me, isLoading: isMeLoading } = useUser();

    const {data: availableAvatarList, isLoading: isAvailableAvatarListLoading} = useQuery({
        queryKey: ["availableAvatarList"],
        queryFn: () => getAvailableAvatarList(me?.id),
    })

    const {data: ownedAvatarList, isLoading: isOwnedAvatarListLoading} = useQuery({
        queryKey: ["ownedAvatarList"],
        queryFn: () => getOwnedAvatarList(me?.id),
    })

    if (isMeLoading || isAvailableAvatarListLoading || isOwnedAvatarListLoading) {
        return <div>Loading...</div>
    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Trigger />
            <Dialog.Backdrop />
            <Dialog.Positioner style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }}>
                <Dialog.Content 
                    padding={4}
                    position="relative"
                    w={"full"}
                    maxW={"500px"}
                    margin={"0 auto"}
                >
                    <Dialog.Header>
                        <Dialog.Title>아바타 구매</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <AvatarShop availableAvatarList={availableAvatarList} ownedAvatarList={ownedAvatarList} />
                    </Dialog.Body>
                    <Dialog.Footer justifyContent={"center"}>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    )
}