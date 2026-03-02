
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onRemoveTodo, onMouseDown, onMouseUp }) {
  console.log(onMouseDown, onMouseUp);
  // console.log("these are the props for todoList", todoList);
  return (
    <div id="StorageList">
      
        {todoList.map(todo => (
          <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
        ))}
    </div>
  );
}

export default TodoList;
