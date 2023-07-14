import React, { useState } from "react";
import Api from "../Api";
import { toast } from "react-toastify";

const Register = ({ authenticate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    try {
        const response = await Api().post("/api/register", user);
        if (response.data) {
            if (response.data.token) {
                toast('Succesfully registered!');
                authenticate(response.data.token);
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
      <h1>Register:</h1>
      <form onSubmit={handleRegister}>
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
