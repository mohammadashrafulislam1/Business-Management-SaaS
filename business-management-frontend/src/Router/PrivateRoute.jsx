import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Components/AuthProvider";

const PrivateRoute = ({children}) => {
    const {user, loader} = useContext(AuthContext);

    if (loader) {
        return <div>Loading...</div>;
    }
    if (user) {
        return children;
    } else {
        return <Navigate to='/login' />;
    }
};

export default PrivateRoute;
