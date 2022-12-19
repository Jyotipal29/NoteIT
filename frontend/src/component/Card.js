import React from "react";
import FadeLoader from "react-spinners/FadeLoader";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { api } from "../constants/api";
import { useNote } from "../context/context";
import { useNavigate } from "react-router";
const Container = styled.div`
  position: relative;
  top: 30px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const Wrapper = styled.div``;
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
  cursor: pointer;
`;
const Subbutton = styled.button`
  padding: 5px 20px;
  margin: 5px 10px;
  font-size: 20px;
  border: 1px solid blue;
  color: blue;
  cursor: pointer;
`;

const ButtonC = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  padding: 10px;
  margin: 5px;
`;
const Span = styled.span`
  font-size: 20px;
`;
const ColorDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Card = ({ show, setShow }) => {
  const navigate = useNavigate();
  const {
    state: { user, notes },
    dispatch,
  } = useNote();
  const colors = ["#809bce ", "#95b8d1", "#b8e0d2", "#d6eadf", "#eac4d5"];
  const [title, setTitle] = useState(" ");
  const [text, setText] = useState(" ");
  const [category, setCategory] = useState(" ");
  const [Bgcolor, setBgColor] = useState(" ");
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
     
        const { data } = await axios.post(
          `${api}/note/create`,
          { title, Bgcolor, text, category },
          config
        );
        console.log(data, "notes data");
        dispatch({ type: "ADD_NOTE", payload: data });
        setLoading(false);
        toast.success("note created");
        setTitle("");
        setText("");
        setCategory("");
        console.log(notes, "notes");
      
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  console.log(notes, "notes");
  return (
    <>
      {loading ? (
        <FadeLoader
          color="blue"
          speedMultiplier={0.5}
          height={30}
          margin={50}
          width={2}
        />
      ) : (
        <Container>
          <Wrapper>
            <Form>
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
              <ColorDiv>
                <Span style={{ color: Bgcolor }}>color</Span>
                {colors.map((item) => (
                  <ButtonC
                    type="button"
                    onClick={() => setBgColor(item)}
                    style={{ backgroundColor: item }}
                  ></ButtonC>
                ))}
              </ColorDiv>
              <Button type="submit" onClick={submitHandler}>
                save
              </Button>
              <Subbutton onClick={() => setShow(!show)}>cancel</Subbutton>
            </Form>
          </Wrapper>
          <ToastContainer />
        </Container>
      )}
    </>
  );
};

export default Card;
