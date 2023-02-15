import { FormEvent, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";

const IfValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card!==null;

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal) * 100
    const currentUser = useSelector(selectCurrentUser)
    const [isProcessingPayment,setIsProcessingPayment] = useState(false)

    const paymentHandler = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if ( !stripe || !elements ) { return;
        };

        setIsProcessingPayment(true)

        const response = await fetch("/.netlify/functions/create-payment-intent", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({ amount: amount })
        }).then(res => res.json())

        const clientSecret = response.paymentIntent.client_secret

        const cardDetails = elements.getElement(CardElement)

        if (!IfValidCardElement(cardDetails)) return;
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardDetails,
                billing_details: {
                    name: currentUser ? currentUser.displayName : "Guest"
                }
            }
        })

        setIsProcessingPayment(false)

        if(paymentResult.error)alert(paymentResult.error);
        else{
            if (paymentResult.paymentIntent.status === "succeeded"){
                alert("PAYMENT SUCCESSFUL")
            }
        }
    }

    return(
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement/>
                <PaymentButton buttonType={BUTTON_TYPE_CLASSES.inverted} isLoading={isProcessingPayment} >Pay Now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
};

export default PaymentForm;