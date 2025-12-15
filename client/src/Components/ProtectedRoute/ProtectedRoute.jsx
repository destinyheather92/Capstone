import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import ConstructionAppContext from "../../Context/ConstructionAppContext";

const isAuthenticated = async () => {
  try {
    // Make a GET request to the server's authentication check endpoint
    const response = await axios.get("http://localhost:8080/api/user/auth/check", {
      withCredentials: true, // Include cookies with the request, important for sending the JWT stored in cookies
    });

    const resStatus = response.status === 200 ? true : false;
    const userObj = {
      isLogged: resStatus,
      user: response.data.user,
    };
    return userObj;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const ProtectedRoute = ({ element: Component , key, docId, onDeleted}) => {
  const { user, setUser } = useContext(ConstructionAppContext);
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated();

      setIsAuth(auth.isLogged);
      if (auth) {
        setUser(auth.user);
      }
    };
    checkAuth();
  }, []);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }
// the key is for a special refresh that kind of acts like a window location reload with out actually being that. 
  return isAuth ? <Component key={key} docId={docId} onDeleted={onDeleted}/> : <Navigate to="/login" />;
};

export default ProtectedRoute;
