const CartModal = (props) => {
  const { products, totalAmount } = props.data;
  const { onAdd, onRemove } = props;

  console.log(products);

  let cartData;
  if (products.length > 0) {
    cartData = products.map((product) => (
      <>
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
      </>
    ));
  }

  return (
    <>
      <div>
        <h2>Shopping Cart</h2>
        <span>Total: ${totalAmount.toFixed(2)}</span>
      </div>
      {cartData}
    </>
  );
};

export default CartModal;
