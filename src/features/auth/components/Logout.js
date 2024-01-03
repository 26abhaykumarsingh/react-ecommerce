import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(signOutAsync());
  });
  //but useEffect runs after render, so we have to delay navigate part
  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
}

export default Logout;
