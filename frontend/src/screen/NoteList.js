import React, { useState } from "react";
// import "./notelist.css";
import SingleNote from "../component/SingleNote";
import styled from "styled-components";
import { useNote } from "../context/context";
const Container = styled.div`
  color: #f9f9f9;
  max-width: 1400px;
  margin: 0 auto;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px;
`;
const Heading = styled.h1`
  text-align: center;
  margin: 10px;
`;
const Filters = styled.div`
  margin: 10px 20px;
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  padding: 10px;
  color: black;
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;
const NoteList = () => {
  const {
    dispatch,
    state: { notes },
  } = useNote();
  const categories = notes
    .map((note) => note.category.toLowerCase())
    .filter((note, index, self) => self.indexOf(note) === index);

  return (
    <Container>
      {/* <Heading>Notes</Heading> */}
      <Filters>
        <Filter>
          Sort:
          <Select
            // name="sort"
            onChange={(e) =>
              dispatch({ type: "SORT_BY_DATE", payload: e.target.value })
            }
          >
            <Option disabled>By date</Option>
            <Option value="newest">newest</Option>
            <Option value="oldest">oldest</Option>
          </Select>
        </Filter>
        <Filter>
          Category:
          <Select
            name="priority"
            onChange={(e) =>
              dispatch({ type: "FILTER_BY_CATEGORY", payload: e.target.value })
            }
          >
            {/* <Option value="imp" disabled>
              imp
            </Option> */}
            <Option value="all">All</Option>
            {categories.map((category) => (
              <Option value={category}>{category.toUpperCase()}</Option>
            ))}
          </Select>
        </Filter>
      </Filters>
      <Wrapper>
        <SingleNote />
      </Wrapper>
    </Container>
  );
};

export default NoteList;
