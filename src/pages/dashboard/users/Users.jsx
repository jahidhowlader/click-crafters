import { useQuery } from "@tanstack/react-query";
import { FaRegTrashAlt, FaUsers } from "react-icons/fa";

const Users = () => {

    const { data: users = [], refetch } = useQuery(['users'], async () => {

        const res = await fetch('http://localhost:5000/users')
        return res.json()
    })

    console.log(users);

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
                                            user.role ||
                                            <button className="bg-orange hover:bg-opacity-80 p-3 rounded">
                                                <FaUsers></FaUsers>
                                            </button>
                                        }
                                    </td>
                                    <th className="text-center">

                                        <button className="bg-red text-white hover:bg-opacity-80 p-3 rounded">
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