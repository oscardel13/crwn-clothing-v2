import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.reducer'
import { selectCartItems } from '../../store/cart/cart.selector'
import { CartItem } from '../../store/cart/cart.reducer';

import {
    CheckoutItemContainer,
    ImageContainer,
    BaseSpan,
    Quantity,
    Arrow,
    Value,
    RemoveButton,
  } from './checkout-item.styles';
const CheckoutItem = ({ item } : { item: CartItem }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const clearItem = () => dispatch(clearItemFromCart(item));

    const subOneItem = () => dispatch(removeItemFromCart(item));
    const addOneItem = () => dispatch(addItemToCart(item));
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={item.imageUrl} alt="" />
            </ImageContainer>
            <BaseSpan>{item.name}</BaseSpan>
            <Quantity>
                <Arrow onClick={subOneItem}>
                    &#10094;
                </Arrow>
                <Value>{item.quantity}</Value>
                <Arrow onClick={addOneItem}>
                    &#10095;
                </Arrow>
            </Quantity>
            <BaseSpan>{item.price}</BaseSpan>
            <RemoveButton onClick={clearItem}>
                &#10005;
            </RemoveButton>
        </CheckoutItemContainer>
    )
};

export default CheckoutItem;