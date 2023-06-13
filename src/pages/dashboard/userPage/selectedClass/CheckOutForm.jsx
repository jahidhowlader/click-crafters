import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hook/useAxiosSecure';
import useAuthContext from '../../../../hook/useAuthContext';

const CheckOutForm = ({ price }) => {

    const stripe = useStripe()
    const elements = useElements()
    const {user} = useAuthContext()
    const [axiosSecure] = useAxiosSecure()
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('')

    useEffect(()=> {
        console.log(price);
        axiosSecure.post('/create-payment-intent', {price})
        .then(res => {
            console.log(res.data.clientSecret);
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

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('error', error.message);
            setCardError(error.message)
        } else {
            setCardError('')
            console.log('payment method', paymentMethod);
        }

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            // '{PAYMENT_INTENT_CLIENT_SECRET}',
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  email: user?.email || "Unknown",
                  name: user?.displayName || "Annonymous"
                },
              },
            },
          );

          if(confirmError){
            console.log(confirmError);
          }

          console.log(paymentIntent);

        console.log(card);
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
                <button type="submit" className='bg-blue my-5 text-white px-5 py-2' disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-red text-center'>{cardError}</p>
            }
        </>
    );
};

export default CheckOutForm;