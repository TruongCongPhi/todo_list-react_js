import { IoIosRemoveCircleOutline } from "react-icons/io";
const ToDoItem = ({ id, text, onDelete, isComplete, onToggleComplete }) => {
  return (
    <div>
      <div className="flex items-center gap-4 rounded-lg border border-gray-200 transition hover:bg-gray-50 mb-3">
        <label className="flex cursor-pointer grow h-full p-4">
          <input
            type="checkbox"
            checked={isComplete}
            onChange={() => onToggleComplete(id)}
            className="rounded border-gray-300 mr-3"
          />
          <div className="">
            <strong
              className={`font-medium text-gray-900 ${
                isComplete ? "line-through" : ""
              }`}
            >
              {text}
            </strong>
          </div>
        </label>
        <IoIosRemoveCircleOutline
          onClick={() => onDelete(id)}
          className="hover:text-red-700 text-lg rounded-full cursor-pointer mr-4"
        />
      </div>
    </div>
  );
};

export default ToDoItem;
