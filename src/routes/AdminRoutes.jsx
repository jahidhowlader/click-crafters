import { Navigate } from "react-router-dom";
import useAuthContext from "../hook/useAuthContext";
import Loader from "../pages/shared/Loader";
import useAdmin from "../hook/useAdmin";

const AdminRoutes = ({children}) => {
    const { user, loading } = useAuthContext()
    const [isAdmin, isAdminLoading] = useAdmin()

    console.log(isAdmin);


    if (loading || isAdminLoading) {
        return <Loader></Loader>
    }

    if (user && isAdmin) {
        return children
    }

    return <Navigate to="/"></Navigate>
};

export default AdminRoutes;