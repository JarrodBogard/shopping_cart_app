import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.totalAmount);

  const cartItemsList = cartItems.map((item) => (
    <CartItem key={item.id} item={item} />
  ));

  const showCartHandler = () => {
    dispatch(uiActions.showCart());
  };

  return (
    <Modal onClose={showCartHandler}>
      <div>
        <h2>Shopping Cart</h2>
        <span>Total: {`$${Math.abs(total).toFixed(2)}`}</span>
      </div>
      <ul>{cartItemsList}</ul>
      <button onClick={showCartHandler}>Close</button>
      <button
        onClick={() => {
          console.log(cartItems);
        }}
      >
        Place order
      </button>
    </Modal>
  );
};

export default Cart;
