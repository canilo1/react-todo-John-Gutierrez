import React from 'react';

const todoList = [{ id: 1, title: "Complete assignment" }];

function TodoList() {
  return (
    <div>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

