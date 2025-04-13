import { Dialog, Button, Input, Field} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Select from "../atoms/Select/Select";
import Switch from "../atoms/Switch/Switch";
import { createRoom } from "../../services/remote/room";
import styles from './CreateRoomModal.module.scss';
import { RouteDispatchContext } from "../provider/RouteProvider";
import { useContext } from "react";

type FormValues = {
  roomName: string;
  maxPlayers: string;
  difficulty: "EASY" | "NORMAL" | "HARD";
  mainCategory: string;
  subCategory: string;
  isPrivate: boolean;
  password: string;
  problemCount: number;
};

export default function CreateRoomModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      roomName: "",
      maxPlayers: "4",
      difficulty: "EASY",
      mainCategory: "SCIENCE",
      subCategory: "PHYSICS",
      isPrivate: false,
      password: "",
      problemCount: 10
    }
  });

  const routerDispatch = useContext(RouteDispatchContext);

  const isPrivate = watch("isPrivate");

  const onSubmit = async (data: FormValues) => {
    if (!data.roomName.trim()) {
      alert("방 이름을 입력해주세요.");
      return;
    }

    if (Number(data.maxPlayers) > 8) {
      alert("최대 인원은 8명을 초과할 수 없습니다.");
      return;
    }

    if (data.isPrivate && data.password.length !== 4) {
      alert("비밀번호는 4자리여야 합니다.");
      return;
    }

    const response = await createRoom({
      title: data.roomName,
      password: data.isPrivate ? data.password : null,
      capacity: Number(data.maxPlayers),
      difficulty: data.difficulty,
      mainCategory: data.mainCategory,
      subCategory: data.subCategory,
      isPrivate: data.isPrivate,
      problemCount: data.problemCount
    });

    if (response.status < 200 || response.status >= 300) {
      alert("방 생성에 실패했습니다.");
      return;
    }
    
    routerDispatch("GAME_ROOM", { roomId: response.id });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      {/* <Dialog.Trigger /> */}
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
                {...register("roomName", { required: "방 이름을 입력해주세요." })}
                placeholder="방 이름을 입력하세요"
              />
              {errors.roomName && <Field.ErrorText>{errors.roomName.message}</Field.ErrorText>}
            </Field.Root>

            <Field.Root mt={4}>
              <Field.Label>최대 인원</Field.Label>
              <Input
                type="number" 
                {...register("maxPlayers", { 
                  min: { value: 2, message: "최소 2명 이상이어야 합니다." },
                  max: { value: 8, message: "최대 8명까지 가능합니다." }
                })}
                min={2}
                max={8}
              />
              {errors.maxPlayers && <Field.ErrorText>{errors.maxPlayers.message}</Field.ErrorText>}
            </Field.Root>

            <Field.Root mt={4}>
              <Field.Label>난이도</Field.Label>
              <Select
                options={[
                  { value: "EASY", label: "쉬움" },
                  { value: "MEDIUM", label: "보통" },
                  { value: "HARD", label: "어려움" }
                ]}
                value={watch("difficulty")}
                onChange={(value) => setValue("difficulty", value as "EASY" | "NORMAL" | "HARD")}
              />
              {errors.difficulty && <Field.ErrorText>{errors.difficulty.message}</Field.ErrorText>}
            </Field.Root>

            <Field.Root mt={4}>
              <Field.Label>메인 카테고리</Field.Label>
              <Select
                options={[
                  { value: "SCIENCE", label: "과학" }
                ]}
                value={watch("mainCategory")}
                onChange={(value) => setValue("mainCategory", value)}
              />
              {errors.mainCategory && <Field.ErrorText>{errors.mainCategory.message}</Field.ErrorText>}
            </Field.Root>

            <Field.Root mt={4}>
              <Field.Label>서브 카테고리</Field.Label>
              <Select
                options={[
                  { value: "PHYSICS", label: "물리" }
                ]}
                value={watch("subCategory")}
                onChange={(value) => setValue("subCategory", value)}
              />
              {errors.subCategory && <Field.ErrorText>{errors.subCategory.message}</Field.ErrorText>}
            </Field.Root>

            <Field.Root>
              <Field.Label>퀴즈 갯수</Field.Label>
              <Input 
                {...register("problemCount", { required: "방 이름을 입력해주세요." })}
                type="number"
                placeholder="퀴즈 갯수를 입력하세요"
              />
              {errors.problemCount && <Field.ErrorText>{errors.problemCount.message}</Field.ErrorText>}
            </Field.Root>

            <Field.Root mt={4}>
              <Field.Label>비공개 방</Field.Label>
              <Switch
                checked={isPrivate}
                onChange={(checked) => setValue("isPrivate", checked)}
                label="비공개 방으로 설정"
              />
            </Field.Root>

            {isPrivate && (
              <Field.Root mt={4}>
                <Field.Label>비밀번호</Field.Label>
                <Input
                  type="password"
                  {...register("password", {
                    required: isPrivate ? "비밀번호를 입력해주세요." : false,
                    minLength: { value: 4, message: "비밀번호는 4자리여야 합니다." },
                    maxLength: { value: 4, message: "비밀번호는 4자리여야 합니다." }
                  })}
                  placeholder="4자리 비밀번호를 입력하세요"
                  maxLength={4}
                  minLength={4}
                />
                {errors.password && <Field.ErrorText>{errors.password.message}</Field.ErrorText>}
              </Field.Root>
            )}
          </Dialog.Body>
          <Dialog.Footer justifyContent={"center"}>
            <Button variant="outline" mr={3} onClick={onClose} className={styles.cancelButton}>
              취소
            </Button>
            <Button className={styles.createButton} onClick={handleSubmit(onSubmit)}>
              방 만들기
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}