import { useRecoilState, useRecoilValue } from "recoil";
import { categoryList, selectedCategory, toDoSelector } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(selectedCategory);
  const Categories = useRecoilValue(categoryList);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        {Categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
        {/* <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option> */}
      </select>
      <CreateToDo />
      <CreateCategory />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
};

export default ToDoList;
