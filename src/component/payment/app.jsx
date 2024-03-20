import React from 'react';
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutPage from './checkoutPage';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51JyZnLEUCTnSN1QD2t72AR00eLIOOkh3vYQheEGAZEaxPCjUKgxS5epl6OKLwjlWU64hZvs2k0yz8snO1aK0E18T00e2UFDR2k');

function App() {
  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutPage />
    </Elements>
  );
};

export default App;