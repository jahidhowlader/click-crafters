import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../../../../hook/useAuthContext";
import Table from "./Table";

const EnrolledClasses = () => {

    // Auth Context
    const { user } = useAuthContext()
    const [axiosSecure] = useAxiosSecure()

    const { data: myCourses = [] } = useQuery({
        queryKey: ['book-course'],
        queryFn: async () => {
            const res = axiosSecure.get(`/book-course?email=${user?.email}`)
            return res
        }
    })

    return (
        <>
            <Helmet>
                <title>Enrolled Classes | Click Crafters</title>
            </Helmet>

            <section className="my-8">
                <h3 className="text-3xl font-bold uppercase">Check it our new Add list </h3>
                <div className="overflow-x-auto my-8">

                    <table className="table">

                        {/* head */}
                        <thead className="bg-primary-clr text-white uppercase text-lg">
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>CourseId</th>
                                <th className="text-center">TransactionID</th>
                                <th className="text-center">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                myCourses.data && myCourses.data.map((myCourse,idx) => <Table
                                    key={myCourse._id}
                                    idx={idx}
                                    myCourse={myCourse}
                                ></Table>)
                            }
                        </tbody>

                    </table>
                </div>
            </section>
        </>
    );
};

export default EnrolledClasses;