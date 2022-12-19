import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../constants/api";
import SingleNote from "../component/SingleNote";
import styled from "styled-components";
import { useNote } from "../context/context";
import FadeLoader from "react-spinners/FadeLoader";

const Container = styled.div`
  color: #f9f9f9;
  max-width: 1200px;
  margin: 0 auto;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
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
  let [loading, setLoading] = useState(false);
  const {
    state: { user, notes, sort, category },
    dispatch,
  } = useNote();
  const categories = notes
    .map((note) => note.category.toLowerCase())
    .filter((note, index, self) => self.indexOf(note) === index);
  useEffect(() => {}, [notes]);

  // fetch all notes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${api}/note/`, config);
      dispatch({ type: "GET_NOTE", payload: data });
      setLoading(false);
    };
    fetchData();
  }, []);

  // filtered products
  const transformedProduct = () => {
    let sortedProducts = notes;
    sortedProducts = sortedProducts.sort((a, b) => {
      const aCreatedAt = new Date(a.createdAt);
      const bCreatedAt = new Date(b.createdAt);

      return sort === "newest"
        ? bCreatedAt - aCreatedAt
        : aCreatedAt - bCreatedAt;
    });

    if (category && category !== "all") {
      console.log(category, "93");
      sortedProducts = sortedProducts?.filter(
        (item) => item.category.toLowerCase() == category.toLowerCase()
      );
    }

    return sortedProducts;
  };

  return (
    <Container>
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
              dispatch({
                type: "FILTER_BY_CATEGORY",
                payload: e.target.value,
              })
            }
          >
            <Option value="all">All</Option>
            {categories.map((category) => (
              <Option value={category}>{category.toUpperCase()}</Option>
            ))}
          </Select>
        </Filter>
      </Filters>
      <Wrapper>
        {loading ? (
          <FadeLoader
            color="blue"
            height={30}
            margin={50}
            width={2}
            speedMultiplier={3}
            loading={loading}
          />
        ) : (
          transformedProduct().map((item) => <SingleNote item={item} />)
        )}
      </Wrapper>
    </Container>
  );
};

export default NoteList;
