import { useEffect, useRef, useState } from "react";
import ToDoItem from "./ToDoItem";

const ToDo = () => {
  const [toDoList, setToDoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newToDo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setToDoList((prev) => [...prev, newToDo]);
    inputRef.current.value = "";
  };

  const deleteItem = (id) => {
    setToDoList((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleComplete = (id) => {
    setToDoList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isComplete: !item.isComplete } : item
      )
    );
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDoList));
  }, [toDoList]);

  return (
    <div className="font-mono w-full h-screen flex flex-col items-center justify-center px-5 py-5">
      <div className="w-full sm:w-1/2 max-h-[80%] bg-white p-5 pb-7 rounded-lg">
        <div className="h-full overflow-hidden">
          <h3 className="font-medium text-xl mb-3">To Do List</h3>
          <div className="flex">
            <label className="grow relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-gray-600">
              <input
                ref={inputRef}
                type="text"
                placeholder="Bạn định làm gì hôm nay?"
                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-base"
              />
              <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                Bạn định làm gì hôm nay?
              </span>
            </label>

            <button
              onClick={add}
              className="ml-3 cursor-pointer group inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
            >
              <span className="block rounded-full bg-white px-7 py-3 text-base font-medium group-hover:bg-transparent">
                Thêm
              </span>
            </button>
          </div>
          <hr className="my-3" />
          <div className="overflow-auto h-full">
            {toDoList.map((item) => (
              <ToDoItem
                key={item.id}
                id={item.id}
                text={item.text}
                isComplete={item.isComplete}
                onDelete={deleteItem}
                onToggleComplete={toggleComplete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
