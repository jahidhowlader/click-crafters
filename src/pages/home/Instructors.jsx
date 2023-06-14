import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import axios from "axios";


const Instructors = () => {

    const [instructors, setInstructors] = useState([])
    useEffect(() => {

        axios.get('http://localhost:5000/instructor')
            .then(data => {
                setInstructors(data.data)
            })
    }, [])

    return (
        <section className="">
            <h2 className="text-center font-bold text-3xl">Learn from the industry icons</h2>
            <p className="text-center text-xl py-5">Pulitzer Prize winners. Cultural icons. Your new instructors. Unlock 700+ <br /> greats to inspire, teach, and support your passion.</p>

            <div className="hidden md:block py-12">

                <Marquee speed={100} pauseOnHover>
                    <div className="flex h-96">
                        {
                            instructors.map(instructor => <img
                                key={instructor._id}
                                src={instructor.image}
                                className="mx-2.5 hover:opacity-80"
                            ></img>)
                        }
                    </div>
                </Marquee>
            </div>

            <div className="md:hidden py-12">
                <Marquee speed={100} pauseOnHover>
                    <div className="flex h-96">
                        {
                            instructors.map(instructor => <img
                                key={instructor._id}
                                src={instructor.image}
                                className="mx-2.5 hover:opacity-80"
                            ></img>)
                        }
                    </div>
                </Marquee>
            </div>
        </section>
    );
};

export default Instructors;