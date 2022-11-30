import React from "react";
import { useNote } from "../context/context";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  top: 50px;
`;
const Wrapper = styled.div`
  /* border: 1px solid black; */
  padding: 10px 30px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;
const Content = styled.div``;
const Name = styled.p`
  font-size: 20px;
  font-weight: 600;
`;
const Mail = styled.p`
  font-size: 20px;
  font-weight: 600;
`;
const Button = styled.button``;
const Heading = styled.h2`
  text-align: center;
`;
const Profile = () => {
  const {
    state: { user },
  } = useNote();
  console.log(user, "user");
  return (
    <Container>
      <Wrapper>
        <Heading>User Profile</Heading>
        <Content>
          <Name> Name : {user.name}</Name>
          <Mail> Email : {user.email}</Mail>
        </Content>
        <Button>Edit Info</Button>
      </Wrapper>
    </Container>
  );
};

export default Profile;
