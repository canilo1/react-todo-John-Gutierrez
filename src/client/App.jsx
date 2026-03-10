import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddToDoForm from "./components/AddToDoForm";
import TodoList from "./components/TodoList";
import Login from "./register/Login";
import SignUp from "./register/register";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showSignup, setShowSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState("");

  const API_URL = "http://localhost:3000/api";

  const getToken = () => localStorage.getItem("token");

  const fetchTodos = async () => {
    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/todos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch todos");
      }

      setTodoList(data.todos || []);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const token = getToken();

      if (!token) return;

      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get current user");
      }

      setCurrentUser(data.user);
      setIsLoggedIn(true);
    } catch (error) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setCurrentUser(null);
      setMessage(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchCurrentUser();
      fetchTodos();
    }
  }, [isLoggedIn]);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setMessage("Login successful");
    fetchTodos();
  };

  const handleSignup = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setShowSignup(false);
    setMessage("Account created successfully");
    fetchTodos();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setTodoList([]);
    setMessage("Logged out");
  };

  const addTodo = async (newTodo) => {
    if (!newTodo.title || newTodo.title.trim() === "") return;

    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newTodo)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create todo");
      }

      setTodoList((prev) => [...prev, data.todo]);
      setMessage(data.message || "Todo created successfully");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const removeTodo = async (id) => {
    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete todo");
      }

      setTodoList((prev) => prev.filter((todo) => todo._id !== id));
      setMessage(data.message || "Todo deleted successfully");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        showSignup ? (
          <SignUp
            onBack={() => setShowSignup(false)}
            onSignup={handleSignup}
          />
        ) : (
          <Login
            onLogin={handleLogin}
            onShowSignup={() => setShowSignup(true)}
          />
        )
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <div id="container1" className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h1>Todo List</h1>
                    {currentUser && <p>Welcome, {currentUser.username}</p>}
                    {message && <p>{message}</p>}
                  </div>
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>

                <AddToDoForm onAddTodo={addTodo} />
                <TodoList
                  todoList={todoList}
                  onRemoveTodo={removeTodo}
                />
              </div>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;