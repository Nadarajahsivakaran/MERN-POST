import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CheckAuth = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  console.log(children);
  console.log(auth.isAuthenticated);
  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default CheckAuth;
