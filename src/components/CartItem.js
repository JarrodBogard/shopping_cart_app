const CartItem = (props) => {
  const { id, title, price, quantity, totalPrice } = props.product;
  const { onAdd, onRemove } = props;

  return (
    <li key={id}>
      <header>
        <h3>{title}</h3>
        <div>
          {totalPrice}
          <span>({price}/item)</span>
        </div>
      </header>
      <div>
        <div>
          x <span>{quantity}</span>
        </div>
        <button onClick={() => onRemove(id)}>-</button>
        <button onClick={() => onAdd(props.product)}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
