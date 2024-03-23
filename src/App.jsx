import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddToDoForm from './AddToDoForm'
import TodoList from './TodoList'
function App() {
   const[todolist,setTodoList] = useState([]);
   const addTodo = (newtodo) =>{
    setTodoList([...todolist,newtodo])
   }
  return (
    <>
      <h1>Todo List</h1>
      <AddToDoForm onAddTodo = {addTodo}></AddToDoForm>
   
    <TodoList todoList={todolist} />
    </>
  )
}

export default App
