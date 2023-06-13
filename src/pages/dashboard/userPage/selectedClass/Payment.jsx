import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckOutForm from "./CheckOutForm"
import useSelectedCourse from "../../../../hook/useSelectedCourse"

const stripePromise = loadStripe(import.meta.env.VITE_GATWAY_PK)
const Payment = () => {

    const [selectedCourses] = useSelectedCourse()

    const totalAmmount = selectedCourses.reduce((prev, next) => prev + +next.price, 0)
    const price = parseFloat(totalAmmount.toFixed(2))

    return (
        <section className="py-16">
            <h3 className="text-3xl font-bold uppercase pb-32 text-center">Payment Method </h3>

            <div className="grid grid-cols-3">
                <div></div>
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckOutForm price={price}></CheckOutForm> 
                    </Elements>
                </div>
                <div></div>
            </div>
        </section>
    )
}

export default Payment