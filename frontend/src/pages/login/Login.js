import React, { useState } from "react";
import axios from "axios";
import { api } from "../../constants/api";
import { useNote } from "../../context/context";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const { dispatch, token, setToken, isAuth, setIsAuth } = useNote();
  const [name, setName] = useState(" ");
  const [password, setPassword] = useState(" ");
  const submitHandler = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`${api}/auth/login`, {
      name,
      password,
    });
    const token = data.token;
    dispatch({ type: "LOGIN", payload: data });
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", token);
    localStorage.setItem("isAuth", true);
    setToken(token);
    setIsAuth(true);
    navigate("/");
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h2>Login</h2>

        <form className="form" onSubmit={submitHandler}>
          <div className="formControl">
            <lable>Name</lable>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="formControl">
            <lable>Password</lable>
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
          <Link to="/register">register</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
