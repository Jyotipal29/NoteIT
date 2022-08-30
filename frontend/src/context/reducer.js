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
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.concat(action.payload),
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((item) => item._id !== action.payload.id),
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
    case "SORT_BY_DATE":
      return { ...state, sort: action.payload };
    case "FILTER_BY_CATEGORY":
      return { ...state, category: action.payload };
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
