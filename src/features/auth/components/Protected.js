import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authSlice";

function Protected({ children }) {
  const user = useSelector(selectLoggedInUser);

  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }

  return children;
}

export default Protected;

//this component protects its children. if user doesnt exist
//it is redirected to login else children is returned
