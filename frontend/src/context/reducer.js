export const NoteReducer = (state, action) => {
  switch (action.type) {
    case "GET_NOTE":
      return {
        ...state,
        notes: action.payload,
      };
    case "ADD_NOTE":
      return {
        ...state,
        notes: state.notes.concat(action.payload),
      };
    case "REGISTER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuth: false,
      };
    default:
      return state;
  }
};
