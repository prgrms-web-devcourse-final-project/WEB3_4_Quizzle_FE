import { Button, Dialog, Input } from "@chakra-ui/react";

import styles from "./PasswordInputModal.module.scss";
import { useState } from "react";

type PasswordInputModalProps = {
    isOpen: boolean;
    roomId: string;
    onClose: () => void;
    handleJoin: (roomId: string, password: string) => void;
}

export default function PasswordInputModal({isOpen, onClose, handleJoin, roomId}: PasswordInputModalProps) {

    const [password, setPassword] = useState("");

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
                    <Dialog.Body>
                        <Input type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Dialog.Body>
                    <Dialog.Footer justifyContent={"center"}>
                        <Button 
                            variant="outline" 
                            mr={3} 
                            onClick={() => {
                                handleJoin(roomId, password)
                                onClose()
                            }} 
                            className={styles.joinButton}
                        >
                            참가
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    )
}