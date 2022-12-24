import styled from "styled-components";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../constants/api";
import { Link } from "react-router-dom";
import { useNote } from "../context/context";
import ClipLoader from "react-spinners/ClipLoader";

const Container = styled.div`
  background-color: #f9f9f9;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  background-color: #fff;
  width: 400px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;
const Heading = styled.h2`
  margin-bottom: 10px;
  text-align: center;
`;
const Form = styled.form`
  padding: 30px 40px;
`;
const FormControler = styled.div`
  padding: 10px;
  position: relative;
`;
const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
`;
const Label = styled.label`
  display: block;
  color: #777;
  margin-bottom: 5px;
`;
const Small = styled.small`
  display: block;
  margin-top: 5px;
  color: red;
`;
const Button = styled.button`
  color: #fff;
  background-color: blue;
  cursor: pointer;
  padding: 10px;
  border: none;
  display: block;
  width: 100%;
  font-size: 16px;
`;
const Msg = styled.p``;
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch, token, setToken, isAuth, setIsAuth } = useNote();

  const initialValues = { name: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const validationErrors = validate(formValues);
      setFormErrors(validate(formValues));
      // At least one error was found.
      if (Object.values(validationErrors).some((error) => error.length > 0)) {
        toast.error("try again");
        return;
      }
      const { data } = await axios.post(`${api}/auth/login`, formValues);
      const token = data.token;
      dispatch({ type: "LOGIN", payload: data });
      setLoading(false);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", token);
      localStorage.setItem("isAuth", true);
      setToken(token);
      setIsAuth(true);
      toast.success("logged in successfully!");

      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Username is required!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };
  return (
    <Container>
      <Wrapper>
        <Form onSubmit={submitHandler}>
          <Heading>Login Here</Heading>
          <FormControler>
            <Label>Name</Label>
            <Input
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
            <Small>{formErrors.name}</Small>
          </FormControler>

          <FormControler>
            <Label>Password</Label>
            <Input
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
            <Small>{formErrors.password}</Small>
          </FormControler>
          <Button type="submit">
            {loading ? (
              <ClipLoader
                color="white"
                width={0.5}
                height={0.5}
                speedMultiplier={0.5}
                loading={loading}
              />
            ) : (
              "login"
            )}
          </Button>
          <Msg>
            register here <Link to="/register">register</Link>
          </Msg>
        </Form>
      </Wrapper>
      <ToastContainer />
    </Container>
  );
};

export default Login;
