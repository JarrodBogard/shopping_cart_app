import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const CartItem = (props) => {
  const { id, title, price, quantity, totalPrice } = props.item;

  const dispatch = useDispatch();

  const removeFromCartHandler = () => {
    dispatch(cartActions.removeFromCart(id));
  };

  const addToCartHandler = () => {
    dispatch(cartActions.addToCart(props.item));
  };

  return (
    <li>
      <header>
        <h3>{title}</h3>
        <div>
          {`$${Math.abs(totalPrice).toFixed(2)}`}
          <span>({price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div>
        <div>
          x <span>{quantity}</span>
        </div>
        <div>
          <button onClick={removeFromCartHandler}>-</button>
          <button onClick={addToCartHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
