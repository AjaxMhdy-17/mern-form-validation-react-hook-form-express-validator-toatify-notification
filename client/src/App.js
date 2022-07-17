import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import setAuthToken from "./utils/setAuthToken";
import { clearMessage, loadUser } from "./redux/actions/authActions";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import CreatePost from "./components/post/CreatePost";
import Profile from "./components/auth/Profile/Profile";
import ForgetPass from "./components/auth/ForgetPass/ForgetPass";
import ResetPass from "./components/auth/ResetPass/ResetPass";
// import EditPost from "./components/post/EditPost";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

function App() {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  const { message } = userReducer;

  useEffect(() => {
    if (message.length !== 0) {
      for (let i = 0; i < message.length; i++) {
        toast(message[i].msg, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
      dispatch(clearMessage());
    }
  }, [dispatch, message.length, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forget_password" element={<ForgetPass />} />
        <Route path="/reset/:id" element={<ResetPass />} />
      </Routes>
    </div>
  );
}

export default App;
