import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { api } from "../constants/api";
import { useNote } from "../context/context";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
const Container = styled.div`
  width: 400px;
  margin: 20px auto;
  position: relative;
`;
const Wrapper = styled.div`
  min-width: 400px;

  padding: 30px 40px;
  background-color: teal;

  border-radius: 10px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
`;
const Form = styled.form``;
const Heading = styled.h1`
  color: #fff;
  margin-bottom: 10px;
  text-align: center;
`;
const FormControl = styled.div`
  padding: 10px;
`;
const Label = styled.label`
  display: block;
  color: #fff;
  margin-bottom: 10px;
`;
const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
`;
const Textarea = styled.textarea`
  width: 100%;
  padding: 20px;
`;
const Button = styled.button`
  padding: 10px 50px;
  font-size: 16px;
  border: none;
  margin-top: 10px;
  margin-left: 15px;
`;

const Single = ({ show, setShow }) => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const {
    state: { user, notes },
    dispatch,
  } = useNote();
  const [title, setTitle] = useState(" ");
  const [text, setText] = useState(" ");
  const [category, setCategory] = useState(" ");

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${api}/note/${id}`, config);
      setTitle(data.title);
      setText(data.text);
      setCategory(data.category);
    };
    fetchData();
  }, [id]);
  const submitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(
      `${api}/note/${id}`,
      { title, text, category },
      config
    );
    // console.log(data);
    dispatch({ type: "UPDATE_NOTE", payload: data });
    navigate("/notelist");
  };

  return (
    <Container>
      <Wrapper>
        <Form onSubmit={submitHandler}>
          <Heading>Make a note</Heading>
          <FormControl>
            <Label>Title</Label>
            <Input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <Label>Text</Label>
            <Textarea
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <Label>Category</Label>
            <Input
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </FormControl>

          <Button stype="submit">save</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Single;
