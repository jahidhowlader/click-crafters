
const Table = ({idx, myCourse}) => {

    const {course_id, email, price, transactionID} = myCourse
    return (
        <tr>
        <td>
            <p>{idx + 1}</p>
        </td>
        <td className="text-lg">
            <div className="font-bold uppercase">{email}</div>
        </td>
        <td className="text-lg">
        {course_id}
        </td >
        <td className="text-center">
           {transactionID}
        </td>
        <th className="text-center">
            {price}
        </th>
    </tr>
    );
};

export default Table;