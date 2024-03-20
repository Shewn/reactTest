// PaymentForm.tsx

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutPage from './checkoutPage';

const stripePromise = loadStripe('pk_test_51JyZnLEUCTnSN1QD2t72AR00eLIOOkh3vYQheEGAZEaxPCjUKgxS5epl6OKLwjlWU64hZvs2k0yz8snO1aK0E18T00e2UFDR2k');

function PaymentForm() {
    const options = {
        mode: 'payment',
        amount: 1099,
        currency: 'usd',
        // Customizable with appearance API.
        appearance: {/*...*/},
    };
  const handleClick = async () => {
   
    const stripe = await stripePromise;
    if(stripe) {
        const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: '100', quantity: 1 }],
        mode: 'payment',
        successUrl: 'http://localhost:3000/success',
        cancelUrl: 'http://localhost:3000/cancel',
        });

        if (error) {
            console.error('Error:', error);
        }
    }
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutPage />
    </Elements>
  );
}

export default PaymentForm;
