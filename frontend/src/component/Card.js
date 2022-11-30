import React from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { api } from "../constants/api";
import { useNote } from "../context/context";
import { toast } from "react-toastify";
const Container = styled.div`
  position: relative;
  top: 30px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const Wrapper = styled.div`
  /* border: 1px solid black; */
`;
const Form = styled.form`
  padding: 20px 20px;
  margin: 20px 30px;
`;
const Heading = styled.h2`
  margin-top: 0;
  text-align: center;
  font-size: 30px;
`;
const FormControl = styled.div`
  padding: 10px;
`;
const Label = styled.label`
  display: block;
  color: #777;
  font-size: 20px;
`;
const Input = styled.input`
  display: block;
  padding: 10px;
  width: 90%;
`;
const Button = styled.button`
  padding: 5px 20px;
  margin: 5px 10px;
  font-size: 20px;
  background: blue;
  outline: none;
  border: none;
  color: white;
`;
const Subbutton = styled.button`
  padding: 5px 20px;
  margin: 5px 10px;
  font-size: 20px;
  border: 1px solid blue;
  color: blue;
`;
const Card = ({ show, setShow }) => {
  const {
    state: { user, notes },
    dispatch,
  } = useNote();
  const [title, setTitle] = useState(" ");
  const [text, setText] = useState(" ");
  const [category, setCategory] = useState(" ");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `${api}/note/create`,
        { title, text, category },
        config
      );
      console.log(data);
      dispatch({ type: "ADD_NOTE", payload: data });
      setTitle("");
      setText("");
      setCategory("");

      console.log(notes, "notes");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(notes, "notes");
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
            <Input
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
          <Subbutton onClick={() => setShow(!show)}>cancel</Subbutton>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Card;
