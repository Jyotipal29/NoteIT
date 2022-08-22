import React, { useState } from "react";
import axios from "axios";
import { api } from "../../constants/api";
import { useNote } from "../../context/context";
import { useNavigate } from "react-router";
const Register = () => {
  const navigate = useNavigate();
  const {
    state: { user },
    dispatch,
    setToken,
    isAuth,
    setIsAuth,
  } = useNote();
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const submitHandler = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`${api}/auth/register`, {
      name,
      email,
      password,
    });
    const token = data.token;

    dispatch({ type: "REGISTER", payload: data });
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
        <h2>REGISTER</h2>

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
            <lable>Email</lable>
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        </form>
      </div>
    </div>
  );
};

export default Register;
