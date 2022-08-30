import React from "react";
import styled from "styled-components";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNote } from "../context/context";
import { api } from "../constants/api";
import axios from "axios";
const Container = styled.div`
  width: 300px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  position: relative;
`;
const Heading = styled.h2`
  color: black;
  margin-bottom: 10px;
`;
const Text = styled.div`
  color: black;
  padding: 10px;
  text-align: start;
  word-wrap: break-word;
`;
const Cat = styled.small`
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  background-color: red;
  padding: 5px;
  border-radius: 10px;
`;
const DateD = styled.div`
  color: black;
`;
const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Button = styled.button`
  border: none;
  background-color: #fff;
  color: blue;
`;
const SingleNote = () => {
  // console.log(sort, filter);
  const {
    state: { user, notes, sort, category },
    dispatch,
  } = useNote();
  // console.log(notes);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${api}/note/`, config);
      // console.log(data);
      dispatch({ type: "GET_NOTE", payload: data });
    };
    fetchData();
  }, []);
  // console.log(notes);
  const deleteHandler = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.delete(`${api}/note/${id}`, config);
    dispatch({ type: "DELETE_NOTE", payload: data });
  };
  useEffect(() => {}, [notes]);

  const transformedProduct = () => {
    let sortedProducts = notes;
    sortedProducts = sortedProducts.sort((a, b) => {
      const aCreatedAt = new Date(a.createdAt);
      const bCreatedAt = new Date(b.createdAt);

      return sort === "newest"
        ? bCreatedAt - aCreatedAt
        : aCreatedAt - bCreatedAt;
    });

    if (category) {
      console.log(category, "93");
      sortedProducts = sortedProducts?.filter(
        (item) => item.category.toLowerCase() == category.toLowerCase()
      );
    }

    return sortedProducts;
  };

  return (
    <>
      {
        // notes &&
        transformedProduct().map((item) => (
          <Container>
            <Wrapper>
              <Heading>{item.title}</Heading>
              <Text>{item.text}</Text>
              <Cat>{item.category}</Cat>
              <Icons>
                <DateD>
                  {new Date(item.createdAt).toLocaleString("en-US")}
                </DateD>
                <Button onClick={() => deleteHandler(item._id)}>
                  <DeleteOutlineIcon />
                </Button>
                <Link to={`/note/${item._id}`}>
                  <EditOutlinedIcon />
                </Link>
              </Icons>
            </Wrapper>
          </Container>
        ))
      }
    </>
  );
};

export default SingleNote;
