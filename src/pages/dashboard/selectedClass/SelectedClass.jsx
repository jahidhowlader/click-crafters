import { FaRegTrashAlt } from "react-icons/fa";
import useSelectedCourse from "../../../hook/useSelectedCourse";
import Swal from "sweetalert2";

const SelectedClass = () => {

    const [selectedCourses, refetch] = useSelectedCourse()

    // console.log(selectedCourses);

    // handlerDeleteItem
    const handlerDeleteItem = (_id) => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/selected-courses/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.deletedCount === 1) {
                            swalWithBootstrapButtons.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            refetch()
                        }
                    })
                    .catch(e => {
                        Swal.fire({
                            icon: 'error',
                            title: `<span >${e.code}</span>`,
                        })
                    })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })


    }

    return (
        <section className="py-32">
            <h3 className="text-3xl font-bold uppercase">My Selected Courses</h3>

            <div className="overflow-x-auto my-8">
                <table className="table">
                    {/* head */}
                    <thead className="bg-primary-clr text-white uppercase text-lg">
                        <tr>
                            <th>#</th>
                            <th>Course Name</th>
                            <th>Instructor name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            selectedCourses.map((course, idx) =>
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
                                    <td>${course.price}</td>
                                    <th className="flex items-center ">
                                        <button className="mr-2 bg-blue hover:bg-opacity-80 p-2 rounded">
                                            Payment
                                        </button>
                                        <button onClick={() => handlerDeleteItem(course._id)} className="bg-red text-white hover:bg-opacity-80 p-3 rounded">
                                            <FaRegTrashAlt className=""></FaRegTrashAlt>
                                        </button>
                                    </th>
                                </tr>

                            )
                        }

                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default SelectedClass;