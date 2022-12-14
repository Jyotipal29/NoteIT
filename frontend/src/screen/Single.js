import React, { useEffect } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { api } from "../constants/api";
import { useNote } from "../context/context";
import { useNavigate, useParams } from "react-router";
const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  top: 30px;
`;
const Wrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const Form = styled.form`
  padding: 0px 20px;
  margin: 10px;
`;
const Heading = styled.h2`
  margin-top: 5px;
  text-align: center;
  font-size: 30px;
`;
const FormControl = styled.div`
  padding: 10px 10px;
`;
const Label = styled.label`
  display: block;
  font-size: 20px;
  color: #777;
`;
const Input = styled.input`
  padding: 10px;
  display: block;
  width: 100%;
  margin-top: 5px;
`;
const Button = styled.button`
  font-size: 20px;
  display: block;
  padding: 5px 20px;
  margin-left: 10px;
  background-color: blue;
  outline: none;
  border: none;
  color: white;
  cursor: pointer;
`;

const Single = ({ show, setShow }) => {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${api}/note/${id}`, config);
      setLoading(false);

      setTitle(data.title);
      setText(data.text);
      setCategory(data.category);
    };
    fetchData();
  }, [id]);
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
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
      toast.success("note updated ");
      navigate("/notelist");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container>
      {loading ? (
        <FadeLoader
          color="blue"
          height={30}
          margin={50}
          width={2}
          speedMultiplier={3}
        />
      ) : (
        <Wrapper>
          <Heading>Update note</Heading>

          <Form onSubmit={submitHandler}>
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
            <Button type="submit">save</Button>
          </Form>
        </Wrapper>
      )}

      <ToastContainer />
    </Container>
  );
};

export default Single;
