import React, { useState } from "react";
import Api from "../Api";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Login = ({ authenticate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    try {
        const response = await Api().post("/api/login", user);
        console.log(response);
        if (response.data) {
            if (response.data) {
                toast('Succesfully logged in!');
                authenticate(response.data);
                navigate('/recipes');
            }
        }
    } catch (error) {
        console.error(error);
        if (error.response.data.error) {
          toast(error.response.data.error);
        }
    }
  };

  return (
    <div>
      <h1>Login:</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
