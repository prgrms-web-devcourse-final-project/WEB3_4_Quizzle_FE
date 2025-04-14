import { Dialog, Field, Input, Button } from "@chakra-ui/react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { getRoom, updateRoomInfo } from "../../services/remote/room";
import Select from "../atoms/Select/Select";
import Switch from "../atoms/Switch/Switch";
import { MainCategory, SubCategory, CATEGORIES } from "../../types/room";
import { useQuery } from "@tanstack/react-query";

type FormValues = {
    title: string;
    capacity: number;
    difficulty: "EASY" | "NORMAL" | "HARD";
    mainCategory: MainCategory;
    subCategory: SubCategory;
    password: string;
    isPrivate: boolean;
}

export default function UpdateRoomInfoDialog({isOpen, onClose, roomId, refetchRoom}: {isOpen: boolean, onClose: () => void, roomId: string, refetchRoom: () => void}) {

    const {data: room} = useQuery({
        queryKey: ["room", roomId],
        queryFn: () => getRoom(roomId)
    })

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
          title: room?.title,
          capacity: room?.capacity,
          difficulty: room?.difficulty,
          mainCategory: room?.mainCategory,
          subCategory: room?.subCategory,
          isPrivate: room?.isPrivate,
          password: room?.password,
        }
      });
    
      const isPrivate = watch("isPrivate");
      const selectedMainCategory = watch("mainCategory");

      const mainCategoryOptions = useMemo(() => {
        return Object.entries(CATEGORIES).map(([key, category]) => ({
          value: category.name,
          label: key
        }));
      }, []);

      const subCategoryOptions = useMemo(() => {
        const category = Object.values(CATEGORIES).find(c => c.name === selectedMainCategory);
        return category?.subCategories.map(subCategory => ({
          value: subCategory,
          label: subCategory
        })) || [];
      }, [selectedMainCategory]);
    
      const onSubmit = async (data: FormValues) => {
        if (!data.title.trim()) {
          alert("방 이름을 입력해주세요.");
          return;
        }
    
        if (data.capacity > 8) {
          alert("최대 인원은 8명을 초과할 수 없습니다.");
          return;
        }
    
        if (data.isPrivate && data.password.length !== 4) {
          alert("비밀번호는 4자리여야 합니다.");
          return;
        }
    
        const response = await updateRoomInfo(roomId,{
          title: data.title,
          password: data.isPrivate ? data.password : undefined,
          capacity: Number(data.capacity),
          difficulty: data.difficulty,
          mainCategory: data.mainCategory,
          subCategory: data.subCategory,
          isPrivate: data.isPrivate,
        });
    
        if (response.status < 200 || response.status >= 300) {
          alert("방 수정에 실패했습니다.");
          return;
        }
        refetchRoom();
        onClose();
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
                <Dialog.Title>방 정보 수정</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Field.Root>
                  <Field.Label>방 이름</Field.Label>
                  <Input 
                    {...register("title", { required: "방 이름을 입력해주세요." })}
                    placeholder="방 이름을 입력하세요"
                  />
                  {errors.title && <Field.ErrorText>{errors.title.message}</Field.ErrorText>}
                </Field.Root>
    
                <Field.Root mt={4}>
                  <Field.Label>최대 인원</Field.Label>
                  <Input
                    type="number" 
                    {...register("capacity", { 
                      min: { value: 2, message: "최소 2명 이상이어야 합니다." },
                      max: { value: 8, message: "최대 8명까지 가능합니다." }
                    })}
                    min={2}
                    max={8}
                  />
                  {errors.capacity && <Field.ErrorText>{errors.capacity.message}</Field.ErrorText>}
                </Field.Root>
    
                <Field.Root mt={4}>
                  <Field.Label>난이도</Field.Label>
                  <Select
                    options={[
                      { value: "EASY", label: "쉬움" },
                      { value: "NORMAL", label: "보통" },
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
                    options={mainCategoryOptions}
                    value={watch("mainCategory")}
                    onChange={(value) => {
                      setValue("mainCategory", value as MainCategory);
                      // 메인 카테고리가 변경되면 해당 카테고리의 첫 번째 서브카테고리로 설정
                      const category = Object.values(CATEGORIES).find(c => c.name === value);
                      if (category) {
                        setValue("subCategory", category.subCategories[0] as SubCategory);
                      }
                    }}
                  />
                  {errors.mainCategory && <Field.ErrorText>{errors.mainCategory.message}</Field.ErrorText>}
                </Field.Root>
    
                <Field.Root mt={4}>
                  <Field.Label>서브 카테고리</Field.Label>
                  <Select
                    options={subCategoryOptions}
                    value={watch("subCategory")}
                    onChange={(value) => setValue("subCategory", value as SubCategory)}
                  />
                  {errors.subCategory && <Field.ErrorText>{errors.subCategory.message}</Field.ErrorText>}
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
                <Button bgColor="gray.200" color="white" mr={3} onClick={onClose}>
                  취소
                </Button>
                <Button bgColor="quizzle.primary" color="white" onClick={handleSubmit(onSubmit)}>
                  방 만들기
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>
      )
}