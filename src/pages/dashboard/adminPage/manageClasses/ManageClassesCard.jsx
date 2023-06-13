
const ManageClassesCard = ({singlseClass, handlerReveiwByDelete, handlerReveiwByApprove}) => {

    const {_id, thumbnail, title, instructors_name, instructors_email, price, available_seat} = singlseClass
    return (
        <div className="flex flex-col justify-between shadow-lg rounded">
            <div>
                <div>
                    <img src={thumbnail} alt="" className="w-full h-[250px]" />
                </div>
                <div className="p-3">
                    <h3 className="  pt-2 text-xl uppercase font-bold">TITLE: {title}</h3>
                    <div className="py-5">
                        <p className="italic font-bold uppercase">instructor Information</p>
                        <p className="">Name: {instructors_name}</p>
                        <p className="">Email: {instructors_email}</p>
                    </div>
                    <div className=" flex justify-between items-center  text-lg ">
                        <p>Available seats: {available_seat}</p>
                        <p>Price: ${price}</p>
                    </div>
                </div>
            </div>
            <div>
                <hr className="border-black border-opacity-30 " />
                <div className="flex justify-center items-center gap-2 my-3 rounded">
                    {/* <button className='px-3 text-xl bg-red text-white hover:bg-opacity-80 font-medium uppercase py-3 rounded'>Pending</button> */}
                    <button className="px-3 text-xl bg-red text-white  hover:bg-opacity-80  font-medium uppercase py-3 rounded" >Pending</button>
                    <button onClick={() => handlerReveiwByApprove(singlseClass)} className="px-3 text-xl bg-green text-white  hover:bg-opacity-80  font-medium uppercase py-3 rounded" >Approve</button>
                    <button onClick={() => handlerReveiwByDelete(_id)} className="px-3 text-xl bg-orange hover:bg-opacity-80 font-medium uppercase py-3 rounded" >Deny</button>
                </div>
            </div>
        </div>
    );
};

export default ManageClassesCard;