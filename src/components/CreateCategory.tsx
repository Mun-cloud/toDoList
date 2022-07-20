import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { categoryList } from "../atoms";

const ErrorMessage = styled.span`
  color: red;
`;

interface IForm {
  category: string;
}

function CreateCategory() {
  const [categories, setCategories] = useRecoilState(categoryList);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const handleValid = ({ category }: IForm) => {
    if (categories.includes(category)) {
    }
    setCategories((oldCategories) => [...oldCategories, category]);
    setValue("category", ""); // "name"에 해당하는 항목을 두 번째 인자의 값으로 변환
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("category", {
          required: "내용을 입력해 주세요",
          validate: (value) =>
            categories.includes(value)
              ? `${value}는 이미 있는 카테고리 입니다.`
              : true,
        })}
        placeholder="카테고리 추가"
      />
      <button>Add</button>
      <ErrorMessage>{errors?.category?.message}</ErrorMessage>
    </form>
  );
}

export default CreateCategory;
