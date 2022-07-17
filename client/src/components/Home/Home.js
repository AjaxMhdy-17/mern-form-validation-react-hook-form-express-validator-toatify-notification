import React from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { loadUser } from "../../redux/actions/authActions";

const Home = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  const {isAuthenticated} = userReducer
  // console.log();

  return (
    <div className="py-32 flex justify-center">
      <div className="text-5xl">{ isAuthenticated === null ? (<>This Is Home Page You Are Not Logged In</>) : (<>WelCome To Home Page You Are Logged In</>)}</div>
    </div>
  );
};

export default Home;
