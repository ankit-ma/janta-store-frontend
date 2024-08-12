import Cookies from "js-cookie";

const initialState = {
  username: "",
  isLoggedIn: Cookies.get("loggedIn") === "true",
  totalSize: 0,
  fileCount: 0,
  folderCount: 0,
};
const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        folderCount: action.payload.folderCount,
        fileCount: action.payload.fileCount,
        totalSize: action.payload.totalSize,
      };
    case "LOGOUT": {
      Cookies.remove("token");
      Cookies.remove("loggedIn");
      return {
        ...state,
        isLoggedIn: false,
        username: "",
        folderCount: 0,
        fileCount: 0,
        totalSize: 0,
      };
    }

    default:
      return state;
  }
};

export default sessionReducer;
