import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../../../../hook/useAuthContext";
import { FaEdit } from "react-icons/fa";

const MyClasses = () => {

    // Auth Context
    const { user } = useAuthContext()

    // Axios Secure
    const [axiosSecure] = useAxiosSecure()

    // React Query
    const { data: myClasses = [] } = useQuery(['my-classes'], async () => {

        const res = await axiosSecure.get(`/my-classes?email=${user.email}`)
        return res.data
    })

    console.log(myClasses);

    return (
        <>
            <Helmet>
                <title>My Classes | Click Crafters</title>
            </Helmet>

            <section className="py-8">

                <h3 className="text-3xl font-bold uppercase">My Classes </h3>

                <div className="overflow-x-auto my-8">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-primary-clr text-white uppercase text-lg">
                            <tr>
                                <th>#</th>
                                <th>Course Name</th>
                                <th>Feedback</th>
                                <th>Students</th>
                                <th>status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                myClasses.reverse().map((course, idx) =>
                                    <tr key={idx}>
                                        <th>
                                            <p>{idx + 1}</p>
                                        </th>
                                        <td>
                                            <div className="font-bold uppercase">{course.title}</div>
                                        </td>
                                        <td>
                                            {course.instructors_name}
                                        </td>
                                        <td>{course.students}</td>
                                        <td className="flex items-center ">
                                            <p className={course.status === 'approve' ? 'text-green' : 'text-red'}>{course.status}</p>
                                        </td>
                                        <td>
                                        <button  className="bg-orange text-white hover:bg-opacity-80 p-3 rounded">
                                                <FaEdit className=""></FaEdit>
                                            </button>
                                        </td>
                                    </tr>

                                )
                            }

                        </tbody>
                    </table>
                </div>


            </section>
        </>
    );
};

export default MyClasses;