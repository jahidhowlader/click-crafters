import { useQuery } from '@tanstack/react-query'
import useAuthContext from './useAuthContext';

const useSelectedCourse = () => {

    const { user } = useAuthContext()

    const { refetch, data: selectedCourses = [] } = useQuery({
        queryKey: ['selected-courses', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/selected-courses?email=${user?.email}`)
            return res.json()
        }
    })

    return [selectedCourses, refetch]
};

export default useSelectedCourse;