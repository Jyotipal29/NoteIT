import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNote } from "../context/context";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  background-color: blue;
`;
const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
`;
const Logo = styled.div`
  color: #fff;
  font-size: 35px;
  font-weight: bold;
  font-style: italic;
`;
const NavItem = styled.ul`
  display: flex;
`;
const NavItems = styled.li`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-left: 30px;
`;
const Logout = styled.button`
  margin-left: 5px;
`;
const Navbar = () => {
  const navigate = useNavigate();
  const {
    state: { user },
    dispatch,
  } = useNote();

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    dispatch({ type: "LOGOUT" });
    navigate("/register");
  };
  return (
    <Container>
      <Wrapper>
        <Logo>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            NoteIT
          </Link>
        </Logo>
        <NavItem>
          <NavItems>
            <Link
              to="/notelist"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              notes
            </Link>
          </NavItems>
          {user ? (
            <>
              <Logout onClick={logout}>logout</Logout>
              <NavItems>{user.name}</NavItems>
            </>
          ) : (
            <>
              {/* <NavItems>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  login
                </Link>
              </NavItems>
              <NavItems>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Register
                </Link>
              </NavItems> */}
            </>
          )}
        </NavItem>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
