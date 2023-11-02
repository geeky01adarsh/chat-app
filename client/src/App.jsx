import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";

// {login:boolean, user:{user object}}
export const URL = "http://localhost:5000/api/v1";
export const userContext = createContext();


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path:"login",
    element: <Login/>
  }
]);

function App() {
  const [user, setUser] = useState({ login: false, user: {} });
  useEffect(()=>{
    const login = localStorage.getItem('login')
    const username = localStorage.getItem('username')
    const email = localStorage.getItem('email')
    const _id = localStorage.getItem('_id')
    setUser({login, user:{username, email, _id}})
  }, [])

  return (
    <userContext.Provider value={{user, setUser}}>
      {" "}
      <RouterProvider router={router} />{" "}
    </userContext.Provider>
  );
}

export default App;
