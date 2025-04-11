import { Center, Flex, Stack, Input, Button, Field, useDisclosure } from "@chakra-ui/react";
import Card from "../../atoms/Card/Card";
import useUser from "../../../hooks/user";
import Avatar from "../../atoms/Avatar/Avatar";
import { useForm } from "react-hook-form";
import { modifyMyNickname } from "../../../services/remote/user";
import AvatarShopModal from "../../modal/AvatarShopModal";

interface ProfileSettingForm {
    nickname: string;
}

export default function ProfileSettingPage() {

    const { user: me, isLoading: isMeLoading } = useUser();

    const { register, handleSubmit, formState: { errors } } = useForm<ProfileSettingForm>({
        defaultValues: {
            nickname: me?.nickname ?? ""
        }
    });

    const onSubmit = (data: ProfileSettingForm) => {
        // 여기 조건문이 잘못되었습니다. me?.id가 없을 때 return하도록 되어있어서 
        // 실제로는 id가 없을 때만 return되고 있었습니다.
        if (!me?.id || Object.keys(errors).length > 0 || data.nickname.length < 2) {
            return;
        }
        modifyMyNickname(data.nickname, me.id);
        window.location.href = "/";
    }

    const {
        open: isAvatarShopModalOpen,
        onOpen: onAvatarShopModalOpen,
        onClose: onAvatarShopModalClose,
    } = useDisclosure();

    const handleAvatarClick = () => {
        onAvatarShopModalOpen();
    }

    if (isMeLoading) {
        return <div>Loading...</div>
    }
    return (
        <>
        <Center h={"full"}>
            <Card style={{ width: "50%", minWidth: "600px", minHeight: "300px", padding: "20px", paddingTop: "30px"}}>
                <Stack gap={6}>
                    <Flex alignItems={"center"} gap={6}>
                        <Avatar src={me.avatarUrl} style={{ width: "100px", height: "100px"}} onClick={handleAvatarClick}/>
                        <Button bgColor={"white"} color={"black"} border={"1px solid"} borderRadius={6} borderColor={"gray.300"} onClick={() => {}}>아바타 바꾸기</Button>
                    </Flex>
                    <Field.Root>
                        <Field.Label>닉네임</Field.Label>
                        <Input 
                            {...register("nickname", { required: "닉네임을 입력해주세요.", minLength: { value: 2, message: "닉네임은 2글자 이상이어야 합니다." } })}
                            placeholder="닉네임을 입력하세요"
                        />
                    </Field.Root>
                    {errors.nickname && <Field.ErrorText>{errors.nickname.message}</Field.ErrorText>}
                    <Button disabled={isMeLoading || Object.keys(errors).length > 0 || me?.id === undefined} bgColor={"quizzle.primary"} color={"white"} onClick={handleSubmit(onSubmit)}>설정 저장</Button>
                </Stack>
            </Card>
        </Center>
        <AvatarShopModal isOpen={isAvatarShopModalOpen} onClose={onAvatarShopModalClose} />
        </>
    )
}