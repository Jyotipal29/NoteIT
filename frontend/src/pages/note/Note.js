import axios from "axios";
import React, { useEffect } from "react";
import { api } from "../../constants/api";
import { useNote } from "../../context/context";

const Note = () => {
  const {
    state: { user, notes },
    dispatch,
  } = useNote();
  console.log(notes);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${api}/note/`, config);
      console.log(data);
      dispatch({ type: "GET_NOTE", payload: data });
    };
    fetchData();
  }, []);
  console.log(notes, "notes");
  return (
    <div>
      <h2>my notes</h2>
      {notes &&
        notes?.reverse().map((item) => {
          return (
            <>
              <h2>{item?.title}</h2>
              <p>{item?.text}</p>
              <p>{item?.category}</p>
            </>
          );
        })}
    </div>
  );
};

export default Note;
