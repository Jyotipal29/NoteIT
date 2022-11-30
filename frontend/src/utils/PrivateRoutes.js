import { Outlet, Navigate } from "react-router";
import React from "react";
import { useNote } from "../context/context";

const PrivateRoutes = () => {
  const {
    state: { user },
    token,
  } = useNote();
  console.log(token, "token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
