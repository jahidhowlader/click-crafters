import { useQuery } from "@tanstack/react-query";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Users = () => {

    const { data: users = [], refetch } = useQuery(['users'], async () => {

        const res = await fetch('http://localhost:5000/users')
        return res.json()
    })

    // handlerUserAdmin
    const handlerUserAdmin = user => {

        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data => {

                if (data.modifiedCount) {

                    refetch()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: `<span >${e}</span>`,
                })
            })
    }

    // handlerUserInstructor
    const handlerUserInstructor = user => {
        fetch(`http://localhost:5000/users/instructor/${user._id}`, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data => {

                if (data.modifiedCount) {

                    refetch()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Instructor Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: `<span >${e}</span>`,
                })
            })
    }

    // handlerUserDelete
    const handlerUserDelete = _id => {
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

                fetch(`http://localhost:5000/users/delete/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.deletedCount === 1) {
                            swalWithBootstrapButtons.fire(
                                'Deleted!',
                                'User has been deleted.',
                                'success'
                            )
                            refetch()
                        }
                    })
                    .catch(e => {
                        Swal.fire({
                            icon: 'error',
                            title: `<span >${e}</span>`,
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
        <section className="py-8">
            <h3 className="text-3xl font-bold uppercase">All Users: {users.length}</h3>

            <div className="overflow-x-auto my-8">
                <table className="table">
                    {/* head */}
                    <thead className="bg-primary-clr text-white uppercase text-lg">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th className="text-center">Role</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, idx) =>
                                <tr key={idx}>
                                    <th>
                                        <p>{idx + 1}</p>
                                    </th>
                                    <td className="text-lg">
                                        <div className="font-bold uppercase">{user.name}</div>
                                    </td>
                                    <td className="text-lg">
                                        {user.email}
                                    </td >
                                    <td className="text-center">
                                        {
                                            user.role === 'admin' ? <p className="font-bold">ADMIN</p> :
                                                user.role === 'instructor' ?
                                                    <div className="space-x-2 font-semibold">
                                                        <button onClick={() => handlerUserAdmin(user)} className="bg-orange hover:bg-opacity-80 p-3 rounded">
                                                            Make Admin
                                                        </button>
                                                        <button onClick={() => handlerUserInstructor(user)} className="bg-primary-clr text-white p-3 rounded" disabled>
                                                            Make Instructor
                                                        </button>
                                                    </div>
                                                    :
                                                    <div className="space-x-2 font-semibold">
                                                        <button onClick={() => handlerUserAdmin(user)} className="bg-orange hover:bg-opacity-80 p-3 rounded">
                                                            Make Admin
                                                        </button>
                                                        <button onClick={() => handlerUserInstructor(user)} className="bg-blue hover:bg-opacity-80 p-3 rounded">
                                                            Make Instructor
                                                        </button>
                                                    </div>
                                        }
                                    </td>
                                    <th className="text-center">

                                        <button onClick={() => handlerUserDelete(user._id)} className="bg-red text-white hover:bg-opacity-80 p-3 rounded">
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

export default Users;