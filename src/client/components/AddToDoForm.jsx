import { useState } from "react";
import InputWithLabel from "./InputWithLabel";

function AddToDoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");
  const [visibility, setVisibility] = useState(0.5);
  const [theColor, setColor] = useState("black");

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleAddTodo = async (event) => {
    event.preventDefault();

    const trimmedTitle = todoTitle.trim();
    if (!trimmedTitle) return;

    const newTodo = {
      title: trimmedTitle
    };

    await onAddTodo(newTodo);
    setTodoTitle("");
  };

  const toggleOpacityAnimation = () => {
    setVisibility(1);
  };

  const mouseLeft = () => {
    setVisibility(0.5);
  };

  const rightChange = (event) => {
    event.preventDefault();

    const color1 = Math.ceil(Math.random() * 255);
    const color2 = Math.ceil(Math.random() * 255);
    const color3 = Math.ceil(Math.random() * 255);

    const colorValue = `rgb(${color1},${color2},${color3})`;
    setColor(colorValue);
  };

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
      />

      <button
        type="submit"
        onMouseEnter={toggleOpacityAnimation}
        onMouseLeave={mouseLeft}
        className="fadeincontainer"
        style={{ opacity: visibility, color: theColor }}
        onContextMenu={rightChange}
      >
        Add
      </button>
    </form>
  );
}

export default AddToDoForm;