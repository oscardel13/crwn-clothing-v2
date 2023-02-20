import { CartItem as CartItemProp} from '../../store/cart/cart.reducer';
import {CartItemContainer, ItemDetails} from './cart-item.styles';

const CartItem = ({ item } : { item: CartItemProp }) => {

    return (
        <CartItemContainer>
            <img src={item.imageUrl} alt={`${item.name}`} />
            <ItemDetails>
                <span className='name'>{item.name}</span>
                <span className='price'>{item.quantity} x ${item.price}</span>
            </ItemDetails>
        </CartItemContainer>
    );
}

export default CartItem;