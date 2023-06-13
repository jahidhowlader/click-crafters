import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import InstructorCard from './InstructorCard';

const InstructorsPage = () => {

    const instructors = useLoaderData()

    return (
        <>
            <Helmet>
                <title>Instructors | Click Crafters</title>
            </Helmet>

            <section className='my-container py-32'>
                <h3 className='text-3xl font-bold text-center'>The Click Crafters Online Course Instructors</h3>

                <div className='grid grid-cols-4 gap-x-3 gap-y-5 py-12'>
                    {
                        instructors.map((instructor, idx) => <InstructorCard
                            key={idx}
                            instructor={instructor}
                        ></InstructorCard>)
                    }
                </div>
            </section>
        </>
    );
};

export default InstructorsPage;