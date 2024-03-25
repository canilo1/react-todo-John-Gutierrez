import React from 'react';
import TodoListItem from './TodoListItem'

const todoList = [{ id: 1, title: "Complete assignment" }];

function TodoList() {
  return (
    <div>
      <ul>
        {todoList.map(todo => (
         <TodoListItem  key = {todo}/>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

