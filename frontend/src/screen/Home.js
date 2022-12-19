import React from "react";
import { useState } from "react";
import axios from "axios";
import Card from "../component/Card";
import styled from "styled-components";
import { api } from "../constants/api";
import { useNote } from "../context/context";
const Container = styled.div`
  background-color: #f9f9f9;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
`;
const Wrapper = styled.div``;
const Toggler = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;
const Button = styled.button`
  padding: 15px;
  font-size: 40px;
  border-radius: 50%;
  border: none;
  color: blue;
  cursor: pointer;
`;
const Home = () => {
  const [show, setShow] = useState(false);
  return (
    <Container>
      <Wrapper>
        <Toggler>
          <Button onClick={() => setShow(!show)}>+</Button>
        </Toggler>
        {show && <Card show={show} setShow={setShow} />}
      </Wrapper>
    </Container>
  );
};

export default Home;
