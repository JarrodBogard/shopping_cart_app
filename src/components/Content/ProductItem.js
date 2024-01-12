import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
const ProductItem = (props) => {
  const { title, description, price } = props.product;
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(cartActions.addToCart(props.product));
  };

  return (
    <li>
      <header>
        <h3>{title}</h3>
        <div>${price.toFixed(2)}</div>
      </header>
      <p>{description}</p>
      <div>
        <button onClick={addToCartHandler}>Add to cart</button>
      </div>
    </li>
  );
};

export default ProductItem;
