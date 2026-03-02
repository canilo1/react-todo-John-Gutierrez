import  { useState } from 'react';

import AddToDoForm from './components/AddToDoForm'
import TodoList from './components/TodoList';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


// const useMousePosition = () => {
//   const [mousePosition, setMousePosition] = React.useState({ x: null, y: null });

//   React.useEffect(() => {
//     const updateMousePosition = ev => {
//       setMousePosition({ x: ev.clientX, y: ev.clientY });
//     };

//     window.addEventListener('mousemove', updateMousePosition);

//     return () => {
//       window.removeEventListener('mousemove', updateMousePosition);
//     };
//   }, []);

//   return mousePosition;
// };

function App() {
  const [todoList, setTodoList] = useState([])

  const removeTodo = (id) => {
    const filteredTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(filteredTodoList);
  };

  const addTodo = (newTodo) => {
    if (newTodo.title.trim() === "") {
      console.log("This is an empty todo item");
      return;
    }
    setTodoList([...todoList, newTodo]);
  };


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div id = "container1">
            <h1>Todo List</h1>
            <AddToDoForm onAddTodo={addTodo} />
                <TodoList 
                  todoList={todoList} 
                  onRemoveTodo={removeTodo} 
                />
             </div>
        } />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
