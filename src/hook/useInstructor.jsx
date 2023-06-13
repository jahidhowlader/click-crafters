import { useQuery } from "@tanstack/react-query";
import useAuthContext from "./useAuthContext";
import useAxiosSecure from "./useAxiosSecure";

const useInstructor = () => {

    const { user, loading } = useAuthContext()
    const [axiosSecure] = useAxiosSecure()

    const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
        queryKey: ['isInstructor', user?.email], 
        enabled: !loading,
        queryFn: async () => {

            const res = await axiosSecure.get(`/users/instructor/${user?.email}`)
            return res.data.instructor
        }
    })

    return [isInstructor, isInstructorLoading]
};

export default useInstructor;