import TodoListItem from "./TodoListItem";

function TodoList({ todoList, onRemoveTodo, onMouseDown, onMouseUp }) {
  return (
    <div id="StorageList">
      {todoList.map((todo) => (
        <TodoListItem
          key={todo._id}
          todo={todo}
          onRemoveTodo={onRemoveTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;