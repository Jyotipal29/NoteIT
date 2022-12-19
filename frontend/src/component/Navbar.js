import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNote } from "../context/context";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Container = styled.div`
  background-color: blue;
  /* position: fixed;
  z-index: 9999;
  width: 100%; */
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
  cursor: pointer;
`;
const NavItem = styled.ul`
  display: flex;
  align-items: center;
`;
const NavItems = styled.li`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
`;
const Logout = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 35px;
  font-weight: bold;
  cursor: pointer;
`;
const Navbar = () => {
  const navigate = useNavigate();
  const {
    state: { user },
    dispatch,
  } = useNote();
  console.log(user, "user");
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <Container>
      <Wrapper>
        <Logo>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            NoteIT
          </Link>
        </Logo>
        {user ? (
          <NavItem>
            <NavItems>
              <Link
                to="/notelist"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                notes
              </Link>
            </NavItems>
            <NavItems>
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <AccountCircleIcon />
              </Link>
            </NavItems>
            <NavItems>
              <Logout onClick={logout}>
                <LogoutOutlinedIcon />
              </Logout>
            </NavItems>
          </NavItem>
        ) : (
          <NavItem>
            <NavItems>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                login
              </Link>
            </NavItems>
            <NavItems>
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                Register
              </Link>
            </NavItems>
          </NavItem>
        )}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
