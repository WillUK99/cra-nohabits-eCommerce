import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { PaymentContainer, FormContainer } from './payment-form.styles';

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const handlePayment = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) return
    
    const response = await fetch("/netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify({ amount: 100 })
      }
    }).then((resp) => resp.json())

    console.log(response)
  }

  return (
    <PaymentContainer>
      <FormContainer onSubmit={handlePayment}>
        <h2>Card Payment</h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
      </FormContainer>
    </PaymentContainer>
  );
};

export default PaymentForm
