import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckOutForm from "./CheckOutForm"
import { useLocation } from "react-router-dom"

const stripePromise = loadStripe(import.meta.env.VITE_GATWAY_PK)
const Payment = () => {

    const location = useLocation()

    const coursePrice = location.state?.price
    const course = location.state?.course

    const price = parseFloat(coursePrice).toFixed(2)

    return (
        <section className="py-16">
            <h3 className="text-3xl font-bold uppercase pb-32 text-center">Payment Method </h3>

            <div className="grid grid-cols-3">
                <div></div>
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckOutForm course={course} price={price}></CheckOutForm> 
                    </Elements>
                </div>
                <div></div>
            </div>
        </section>
    )
}

export default Payment