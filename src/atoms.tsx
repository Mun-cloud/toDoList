import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

// 카테고리 목록
export const categoryList = atom({
  key: "categoryList",
  default: ["TO_DO", "DOING", "DONE"],
});

// 카테고리 선택된 옵션값
export const selectedCategory = atom({
  key: "selectedCategory",
  default: "TO_DO",
});

// 할 일 목록 전체
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelecotr ",
  // {get}이 있어야 atom의 데이터를 받을 수 있다.
  // selector함수의 장점은 atom이 변경될 때 마다 연동된다는 것이다.
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(selectedCategory);
    // 선택된 카테고리의 값에 해당하는 toDos만 return
    return toDos.filter((toDo) => toDo.category === category);
  },
});
