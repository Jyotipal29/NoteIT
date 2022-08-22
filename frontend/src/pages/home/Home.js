import axios from "axios";
import React, { useState } from "react";
import { api } from "../../constants/api";
import { useNote } from "../../context/context";
const Home = () => {
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
      console.log(notes, "notes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>make notes</h2>
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <input
              nane="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <input
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div>
            <input
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button>save</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
