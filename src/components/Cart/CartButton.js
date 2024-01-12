const CartButton = ({ cartQuantity, onToggle }) => {
  return (
    <button onClick={onToggle}>
      <span>Cart:</span>
      <span>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
