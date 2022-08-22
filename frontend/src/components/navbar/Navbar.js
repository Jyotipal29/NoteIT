import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useNote } from "../../context/context";
import { useNavigate } from "react-router-dom";
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
    navigate("/login");
  };
  return (
    <div className="container">
      <div className="wrapper">
        <div className="logo">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "20px",
            }}
          >
            NoteIT
          </Link>
        </div>
        <ul className="links">
          {user ? (
            <>
              <h2>{user?.name}</h2>
              <button onClick={logout}>logout</button>
              <li>
                <Link
                  to="/note"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  my notes
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
