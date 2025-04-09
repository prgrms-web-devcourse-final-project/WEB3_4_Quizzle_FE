import { Dialog, Button, Input, Field} from "@chakra-ui/react";
import { useState } from "react";
import Select from "../atoms/Select/Select";
import Switch from "../atoms/Switch/Switch";
import { createRoom } from "../../services/remote/room";
import styles from './CreateRoomModal.module.scss';

export default function CreateRoomModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [roomName, setRoomName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("4");
  const [difficulty, setDifficulty] = useState<string>("EASY");
  const [mainCategory, setMainCategory] = useState<string>("SCIENCE");
  const [subCategory, setSubCategory] = useState<string>("PHYSICS");
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");


  const handleCreateRoom = () => {
    createRoom({
      title: roomName,
      password: isPrivate ? password : "",
      capacity: Number(maxPlayers),
      difficulty: difficulty as "EASY" | "MEDIUM" | "HARD",
      mainCategory,
      subCategory,
      isPrivate
    });
  };

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
            <Dialog.Title>새로운 방 만들기</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Field.Root>
              <Field.Label>방 이름</Field.Label>
              <Input 
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="방 이름을 입력하세요"
              />
              <Field.ErrorText />
            </Field.Root>

            <Field.Root mt={4}>
              <Field.Label>최대 인원</Field.Label>
              <Input
                type="number" 
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(e.target.value)}
                min={2}
                max={8}
              />
              <Field.ErrorText />
            </Field.Root>

            <Field.Root mt={4}>
              <Field.Label>난이도</Field.Label>
              <Select
                options={[
                  { value: "EASY", label: "쉬움" },
                  { value: "MEDIUM", label: "보통" },
                  { value: "HARD", label: "어려움" }
                ]}
                value={difficulty}
                onChange={setDifficulty}
              />
              <Field.ErrorText />
            </Field.Root>

            <Field.Root mt={4}>
              <Field.Label>메인 카테고리</Field.Label>
              <Select
                options={[
                  { value: "SCIENCE", label: "과학" }
                ]}
                value={mainCategory}
                onChange={setMainCategory}
              />
              <Field.ErrorText />
            </Field.Root>

            <Field.Root mt={4}>
              <Field.Label>서브 카테고리</Field.Label>
              <Select
                options={[
                  { value: "PHYSICS", label: "물리" }
                ]}
                value={subCategory}
                onChange={setSubCategory}
              />
              <Field.ErrorText />
            </Field.Root>

            <Field.Root mt={4}>
              <Field.Label>비공개 방</Field.Label>
              <Switch
                checked={isPrivate}
                onChange={setIsPrivate}
                label="비공개 방으로 설정"
              />
            </Field.Root>

            {isPrivate && (
              <Field.Root mt={4}>
                <Field.Label>비밀번호</Field.Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                />
              </Field.Root>
            )}
          </Dialog.Body>
          <Dialog.Footer justifyContent={"center"}>
            <Button variant="outline" mr={3} onClick={onClose} className={styles.cancelButton}>
              취소
            </Button>
            <Button className={styles.createButton} onClick={handleCreateRoom}>
              방 만들기
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}