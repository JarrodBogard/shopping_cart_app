import Modal from "./UI/Modal";
import CartItem from "./CartItem";

const Cart = (props) => {
  const { products, totalAmount } = props.data;
  const { onAdd, onRemove, onToggle } = props;

  let cartData;
  if (products.length > 0) {
    cartData = products.map((product) => (
      <CartItem
        key={product.id}
        product={product}
        onAdd={onAdd}
        onRemove={onRemove}
      />
    ));
  }

  return (
    <Modal onClose={onToggle}>
      <div>
        <h2>Shopping Cart</h2>
        <span>Total: {`$${Math.abs(totalAmount).toFixed(2)}`}</span>
      </div>
      <ul>{cartData}</ul>
      <button onClick={onToggle}>Close</button>
      <button
        onClick={() => {
          console.log(props.data.products);
        }}
      >
        Place order
      </button>
    </Modal>
  );
};

export default Cart;
