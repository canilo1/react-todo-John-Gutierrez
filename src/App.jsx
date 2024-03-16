import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './TodoList'
import AddToDoForm from './AddToDoForm'
function App() {

  return (
    <>
    <h1>Todo List</h1>
    <AddToDoForm></AddToDoForm>
    <TodoList />
    
    </>
  )
}

export default App
