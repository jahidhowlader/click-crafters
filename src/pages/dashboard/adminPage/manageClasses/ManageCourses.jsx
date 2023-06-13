import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ManageClassesCard from './ManageClassesCard';
import Swal from 'sweetalert2';

const ManageCourses = () => {



    const [axiosSecure] = useAxiosSecure()

    const { data: pendingClass = [], refetch } = useQuery({
        queryKey: ['manage-classes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/manage-classes')
            return res.data
        }
    })

    // handlerReveiwByDelete
    const handlerReveiwByDelete = async (_id) => {

        await axiosSecure.delete(`/manage-classes/delete/${_id}`)
            .then(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Delete Post',
                    showConfirmButton: false,
                    timer: 1500
                })
                refetch()
            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: `<span >${e}</span>`,
                })
            })
    }

    // handlerReveiwByApprove
    const handlerReveiwByApprove = async (course) => {

        console.log(course);
        const { _id, thumbnail, title, instructors_name, instructors_email, price, available_seat, students } = course


        const updateCourseStatus = {
            thumbnail,
            title,
            instructors_name,
            instructors_email,
            students,
            price,
            available_seat,
            status: 'approve'
        }

        await axiosSecure.put(`/manage-classes/approve/${_id}`, {
            updateCourseStatus
        })
            .then(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Approve Post',
                    showConfirmButton: false,
                    timer: 1500
                })
                refetch()
            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: `<span >${e}</span>`,
                })
            })
    }

    console.log(pendingClass);


    return (
        <>
            <Helmet>
                <title>Manage Classes | Click Crafters</title>
            </Helmet>
            <section className="my-8">
                <h3 className="text-3xl font-bold uppercase">Check it our new Add list </h3>

                <div className="grid grid-cols-3 gap-6 my-5">
                    {
                        pendingClass.reverse().map(singlseClass => <ManageClassesCard
                            key={singlseClass._id}
                            singlseClass={singlseClass}
                            handlerReveiwByDelete={handlerReveiwByDelete}
                            handlerReveiwByApprove={handlerReveiwByApprove}
                        ></ManageClassesCard>)
                    }
                </div>
            </section>
        </>
    );
};

export default ManageCourses;