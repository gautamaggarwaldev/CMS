import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function PrivateRoute({children}) {
  const {user} = useAuth();
  return user ? children : <Navigate to='/login' replace />
}

export default PrivateRoute;
