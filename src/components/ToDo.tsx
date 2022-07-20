import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryList, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoryList);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      // 기존 atom에 저장된 ToDo에서 지금 이 ToDo에 해당하는 것을 id값으로 찾는다.
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      // delete 버튼 클릭시
      if (name === "Delete")
        return [
          ...oldToDos.slice(0, targetIndex),
          ...oldToDos.slice(targetIndex + 1),
        ];
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {categories.map(
        (categoryName) =>
          category !== categoryName && (
            <button key={categoryName} name={categoryName} onClick={onClick}>
              {categoryName}
            </button>
          )
      )}
      <button name="Delete" onClick={onClick}>
        Delete
      </button>
    </li>
  );
}

export default ToDo;
