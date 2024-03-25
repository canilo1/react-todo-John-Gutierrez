import React from "react";

function TodoListItem({props}){
    console.log("Theese are the propss",props)
return (
    <li >{props.todo.title}</li>
);
}

export default TodoListItem;

