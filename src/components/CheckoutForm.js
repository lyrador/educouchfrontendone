import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import {
  Button, Snackbar, Alert
} from '@mui/material';
import CardSection from './CardSection';
import { useAuth } from "../context/AuthProvider";


export default function CheckoutForm({ clientSecret, closePaymentDialogBox, handleNext, requestTransactionRecord }) {
  const stripe = useStripe();
  const elements = useElements();

  // user
  const auth = useAuth();
  const user = auth.user;
  console.log(user);

  // snack bar success payment
  const [openPaymentSuccessSnackbar, setOpenPaymentSuccessSnackbar] = React.useState(false);

  const handleClickSuccessPaymentSnackbar = () => {
    setOpenPaymentSuccessSnackbar(true);
  };

  const handleClosePaymentSuccessSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenPaymentSuccessSnackbar(false);

  };

  // error payment snackbar

  const [openErrorPaymentSnackbar, setOpenErrorPaymentSnackbar] = React.useState(false);

  const handleClickErrorPaymentSnackbar = () => {
    setOpenErrorPaymentSnackbar(true);
  };

  const handleCloseErrorPaymentSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorPaymentSnackbar(false);
  };

  // notification message 
  const[message, setMessage] = useState('');


  

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: user.email

        },
      }
    });

    if (result.error) {
      // Show error to your customer (for example, insufficient funds)
      setMessage(result.error.message);
      handleClickErrorPaymentSnackbar();
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        handleClickSuccessPaymentSnackbar();
        setMessage('Congratulation! You have successfully sent your payment!');
        closePaymentDialogBox();
        requestTransactionRecord();
        handleNext();
      }
    }
  };

  return (
    <>
      <Snackbar open={openPaymentSuccessSnackbar} autoHideDuration={5000} onClose={handleClosePaymentSuccessSnackbar}>
        <Alert onClose={handleClosePaymentSuccessSnackbar} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorPaymentSnackbar} autoHideDuration={5000} onClose={handleCloseErrorPaymentSnackbar}>
        <Alert onClose={handleCloseErrorPaymentSnackbar} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <form>
        <CardSection />
        <br />
        <Button disabled={!stripe} onClick = { (e) => handleSubmit(e)}>Confirm Order</Button>
      </form>
    </>

  );
}