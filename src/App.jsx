import React, { useState, useEffect } from 'react';
import './App.css';
import AddToDoForm from './components/AddToDoForm';
import TodoList from './components/TodoList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sort from './components/Sort';
import styles from './components/TodoListItem.module.css';
import PropTypes from 'prop-types';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  useEffect(() => {
    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mouseDown, setMouseDown] = useState(false);
  const mousePosition = useMousePosition();

  const fetchData = (sortOrder = 'asc') => {
    const token = import.meta.env.VITE_AIRTABLE_API_TOKEN;
    const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
    const tableName = import.meta.env.VITE_TABLE_NAME;
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
    const options = {
      headers: { Authorization: `Bearer ${token}` }
    };

    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Data from Airtable API:", data);

        const todos = data.records
          .map(record => ({
            title: record.fields.title || 'Untitled',
            id: record.id.toString() // Ensure id is a string
          }))
          .filter(todo => todo.title !== undefined);

        console.log("Transformed todos:", todos);

        setTodoList(todos);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
  };

  useEffect(() => {
    fetchData(); // Default to ascending order
  }, []);

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

  const handleMouseDown = () => {
    setMouseDown(true);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <h1>Todo List</h1>
            <AddToDoForm onAddTodo={addTodo} />
            <Sort todoListArray={todoList} setTodoList={setTodoList} />
            <a href="/new">Link to new Page</a>
            {isLoading ? (<p>Loading..</p>) : (
              <div id="TodoContainer">
                <TodoList 
                  todoList={todoList} 
                  onRemoveTodo={removeTodo} 
                />
                <button onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                  {mouseDown ? "Dragging..." : "This is the mouse, " + JSON.stringify(mousePosition)}
                </button>
              </div>
            )}
          </>
        } />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
