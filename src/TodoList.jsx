import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({ todoList }) {
  console.log("these are the props for todoList", todoList);
  return (
    <div>
      <ul>
        {todoList.map(todo => (
         <TodoListItem key={todo.id} todo={todo}/>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
