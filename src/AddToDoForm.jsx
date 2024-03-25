import React, { useState } from "react";

function AddToDoForm(props) {
    const [todoTitle, setTodoTitle] = useState("");

    const handleAddTodo = (event) => {
        event.preventDefault();
        const title = event.target.elements.title.value;
        props.onAddTodo(title);
       
        event.target.reset();
    }

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input id="todoTitle" name="title" value={todoTitle} onChange={(event) => setTodoTitle(event.target.value)} />
            <button>Add</button>
        </form>
    );
}

export default AddToDoForm;
