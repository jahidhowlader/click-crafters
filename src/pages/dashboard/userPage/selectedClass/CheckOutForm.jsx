import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hook/useAxiosSecure';
import useAuthContext from '../../../../hook/useAuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './CheckOutForm.css'

const CheckOutForm = ({ price, course }) => {

    const stripe = useStripe()
    const elements = useElements()
    const { user } = useAuthContext()
    const [axiosSecure] = useAxiosSecure()
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)
    const [tansactionID, setTransactionID] = useState('')

    const navigate = useNavigate()


    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
    }, [])


    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setCardError(error.message)
        } else {
            setCardError('')
        }

        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "Annonymous",
                        name: user?.displayName || "Annonymous"
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }

        setProcessing(false)
        if (paymentIntent.status === 'succeeded') {
            setTransactionID(paymentIntent.id)

            // save payment information to the server
            const paymentDetails = {
                course_id: course.course_id,
                email: user?.email,
                transactionID: paymentIntent.id,
                price: course.price,
                date: new Date(),
                course
            }

            axiosSecure.post('/payments', { paymentDetails })
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Payment Successfull',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        fetch(`https://click-crafters-server-jahidhowlader.vercel.app/course/${course.course_id}`, {
                            method: "PATCH",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(course)
                        })

                        fetch(`https://click-crafters-server-jahidhowlader.vercel.app/course/${course.course_id}`, {
                            method: "DELETE"
                        })

                        navigate('/dashboard/selected-classes')
                    }
                })
        }

        event.target.reset()
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className='text-center'>

                    <button type="submit" className='bg-blue text-white px-5 py-2 ' disabled={!stripe || !clientSecret || processing}>
                        Pay
                    </button>
                </div>
            </form>
            {
                cardError && <p className='text-red text-center mt-3'>{cardError}</p>
            }

            {
                tansactionID && <p className='text-green text-center mt-3'>Transaction Complete with transactionID {tansactionID}</p>

            }
        </>
    );
};

export default CheckOutForm;