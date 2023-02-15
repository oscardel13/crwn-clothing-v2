import { useSelector } from "react-redux";

import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";
import PaymentForm from "../../components/payment-form/payment-form.component";

import CheckoutItem from "../../components/checkout-item/checkout-item.component"


import {CheckoutContainer,CheckoutHeader,Total,HeaderBlock} from './checkout.styles'
const Checkout = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>     
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map( (item) => <CheckoutItem key={item.id} item={item}/>)}
            <Total>TOTAL: ${cartTotal}</Total>
            <PaymentForm/>
        </CheckoutContainer>
    )
};

export default Checkout;