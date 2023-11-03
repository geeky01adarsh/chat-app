import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL, userContext } from "../App";
import axios from "axios";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("geeky01adarsh@gmail.com");
  const [password, setPassword] = useState("geeky01adarsh");
  const [username, setUserName] = useState("");
  const user = useContext(userContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (login) {
        const userData = await axios.post(`${URL}/users/login`, {
          email,
          password,
        });
        // document.cookie = `chatApp = ${{ login: true, user: userData.data.user }}`
        localStorage.setItem("login", true);
        localStorage.setItem("username", userData.data.user.username);
        localStorage.setItem("email", userData.data.user.email);
        localStorage.setItem("_id", userData.data.user._id);
        user.setUser({ login: true, user: userData.data.user });
        navigate("/");
      } else {
        const userData = await axios.post(`${URL}/users/login`, {
          username,
          email,
          password,
        });
        localStorage.setItem("login", true);
        localStorage.setItem("username", userData.data.user.username);
        localStorage.setItem("email", userData.data.user.email);
        localStorage.setItem("_id", userData.data.user._id);

        user.setUser({ login: "true", user: userData.data.user });
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
      alert("Bad Auth!");
    }
  };

  useEffect(() => {
    if (user.user.login) navigate("/");
  }, []);

  return (
    <>
      <div className="login-box">
        {login ? <h2>Login</h2> : <h2>Sign Up</h2>}
        <form action="">
          {/* username */}
          {login ? (
            <></>
          ) : (
            <>
              <label htmlFor="username">Username:</label>
              <input
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </>
          )}

          {/* email */}
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* password */}
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* submit */}
          <input
            className="submit-btn"
            type="submit"
            value={login ? "Login" : "SignUp"}
            onClick={(e) => handleSubmit(e)}
          />

          {/* Switch login/register */}
          {login ? (
            <>
              Create new account?{" "}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setLogin(false);
                }}
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              Login to existing account?{" "}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setLogin(true);
                }}
              >
                Log In
              </button>
            </>
          )}


          {/* second account credentials */}
          <h4>Credentials for second account</h4>
          <span><em>email: </em>geeky01adarsh1@gmail.com</span>
          <span><em>password: </em>geeky01adarsh1</span>
        </form>
      </div>
    </>
  );
};

export default Login;
