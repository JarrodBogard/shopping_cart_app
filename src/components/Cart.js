import Modal from "./UI/Modal";

const Cart = (props) => {
  const { products, totalAmount } = props.data;
  const { onAdd, onRemove, onToggle } = props;

  let cartData;
  if (products.length > 0) {
    cartData = products.map((product) => (
      <li key={product.id}>
        <div>
          <h2>{product.title}</h2>
          <p>
            {product.totalPrice}
            <span>({product.price}/item)</span>
          </p>
        </div>
        <div>
          <h3>{product.quantity}</h3>
          <button onClick={() => onRemove(product.id)}>-</button>
          <button onClick={() => onAdd(product)}>+</button>
        </div>
      </li>
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
