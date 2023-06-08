import { Navigate } from "react-router-dom";
import useAuthContext from "../hook/useAuthContext";

const PrivateRoutes = ({children}) => {

    const {user} = useAuthContext()

    if(user){
        return children
    }

    return <Navigate to="/signin"></Navigate>
};

export default PrivateRoutes;