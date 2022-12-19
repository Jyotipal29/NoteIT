import React from "react";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
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
  background-color: transparent;
  color: blue;
  cursor: pointer;
`;
const SingleNote = ({ item }) => {
  console.log(item, "item");
  const [deleteState, setDeleteState] = useState({
    id: null,
    isLoading: false,
  });

  const {
    state: { user, notes },
    dispatch,
  } = useNote();
  console.log(notes, "notes");
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  console.log(notes);
  const deleteHandler = async (id) => {
    setDeleteState({ isLoading: true, id });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.delete(`${api}/note/${id}`, config);
      dispatch({ type: "DELETE_NOTE", payload: data });
      toast.success("note deleted successfully");
      setDeleteState({ isLoading: false, id: null });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {}, [notes]);

  return (
    <Container style={{ backgroundColor: item.Bgcolor }}>
      <Wrapper>
        <Heading>{item.title}</Heading>
        <Text>{item.text}</Text>
        <Cat>{item.category}</Cat>
        <Icons>
          <DateD>{new Date(item.createdAt).toLocaleString("en-US")}</DateD>
          <Button onClick={() => deleteHandler(item._id)}>
            {deleteState.id === item._id && deleteState.isLoading ? (
              <ClipLoader
                color="blue"
                size={20}
                speedMultiplier={0.5}
                loading={deleteState.isLoading}
              />
            ) : (
              <DeleteOutlineIcon />
            )}
          </Button>
          <Link
            to={`/note/${item._id}`}
            style={{ cursor: "pointer", color: "blue" }}
          >
            <EditOutlinedIcon />
          </Link>
        </Icons>
      </Wrapper>
      <ToastContainer />
    </Container>
  );
};

export default SingleNote;


