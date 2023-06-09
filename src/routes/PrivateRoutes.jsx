import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../hook/useAuthContext";
import Loader from "../pages/shared/Loader";

const PrivateRoutes = ({children}) => {

    const {user, loading} = useAuthContext()

    const location = useLocation()

    if(loading){
        return <Loader></Loader>
    }

    if(user){
        return children
    }

    return <Navigate to="/signin" state={{from : location}} replace></Navigate>
};

export default PrivateRoutes;