import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 25px;
  margin: 0px 20px;
`;

const MainHeading = styled.h1`
  font-size: 50px;
`;

const Text = styled.p`
  font-size: 18px;
  font-weight: 500;
`;
const Button = styled.button`
  padding: 8px 25px;
  font-size: 20px;
  background-color: blue;
  color: white;
  border: none;
  outline: none;
`;
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <MainHeading>404</MainHeading>
      <h2>oops! Page not found</h2>
      <Text>opps! The page you are looking for does not exist</Text>
      <Button onClick={() => navigate("/")}>home</Button>
    </Container>
  );
};

export default PageNotFound;
