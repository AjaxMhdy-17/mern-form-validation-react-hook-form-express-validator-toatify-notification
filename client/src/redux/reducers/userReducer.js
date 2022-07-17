const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  loading: false,
  message: [],
};

const userReducer = (state = initialState, action) => {
  if (action.type === "setMsg") {
    return {
      ...state,
      message: action.payload,
    };
  } else if (action.type === "clearMessage") {
    return {
      ...state,
      message: [],
    };
  } else if (action.type === "loading") {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === "loadUser") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
      loading: false,
    };
  } else if (action.type === "loginUser") {
    localStorage.setItem("token", action.payload.token);
    return {
      ...state,
      token: action.payload.token,
      loading: false,
      isAuthenticated: true,
      message: [{ msg: "login successfull" }],
    };
  } else if (action.type === "authError") {
    localStorage.removeItem("token");
    return {
      ...state,
      isAuthenticated: null,
      user: null,
      token: null,
      loading: false,
      message: [],
    };
  }
  return state;
};

export default userReducer;
