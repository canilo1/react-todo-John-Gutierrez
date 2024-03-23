import React, { useState } from "react";

function AddToDoForm({ onAddTodo }) {
    const [todoTitle, setTodoTitle] = useState("");
    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
      };
    const handleAddTodo = (event) => {
        event.preventDefault();
        const newTodo = {
            title: todoTitle,
            id: Date.now()
          };
        onAddTodo(newTodo);
       
        setTodoTitle('');
    }

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input id="todoTitle" name="title" value={todoTitle} onChange={handleTitleChange} />
            <button>Add</button>
        </form>
    );
}

export default AddToDoForm;
