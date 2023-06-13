import { Navigate } from "react-router-dom";
import useAuthContext from "../hook/useAuthContext";
import Loader from "../pages/shared/Loader";
import useInstructor from "../hook/useInstructor";

const InstructorRoutes = ({children}) => {
    const { user, loading } = useAuthContext()
    const [isInstructor, isInstructorLoading] = useInstructor()

    if (loading || isInstructorLoading) {
        return <Loader></Loader>
    }

    if (user && isInstructor) {
        return children
    }

    return <Navigate to="/"></Navigate>
};

export default InstructorRoutes;