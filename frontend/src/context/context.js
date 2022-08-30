import { createContext, useContext, useReducer, useState } from "react";
import { NoteReducer } from "./reducer";
const noteContext = createContext();

export const useNote = () => {
  return useContext(noteContext);
};

export const NoteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(NoteReducer, {
    notes: [],
    note: [],
    user: JSON.parse(localStorage.getItem("user") || null) || [],
    category: "",
    sort: "newest",
  });

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("isAuth")) || false
  );

  return (
    <noteContext.Provider
      value={{
        state,
        dispatch,
        token,
        setToken,
        isAuth,
        setIsAuth,
      }}
    >
      {children}
    </noteContext.Provider>
  );
};
