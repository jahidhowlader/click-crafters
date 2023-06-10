import { useQuery } from '@tanstack/react-query'
import useAuthContext from './useAuthContext';
import useAxiosSecure from './useAxiosSecure';

const useSelectedCourse = () => {

    const { user, loading } = useAuthContext()
    const [axiosSecure] = useAxiosSecure()

    const { refetch, data: selectedCourses = [] } = useQuery({
        queryKey: ['selected-courses', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/selected-courses?email=${user?.email}`)
            return res.data
        }
    })

    return [selectedCourses, refetch]
};

export default useSelectedCourse;