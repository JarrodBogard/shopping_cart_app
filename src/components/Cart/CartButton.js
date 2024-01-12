import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const CartButton = () => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart());
  };

  return (
    <button onClick={toggleCartHandler}>
      <span>Cart:</span>
      <span>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
