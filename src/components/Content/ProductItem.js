const ProductItem = (props) => {
  const { title, description, price } = props.product;
  const { onAdd } = props;

  const productData = (
    <li>
      <h2>{title}</h2>
      <p>
        <span>{description}</span>
      </p>
      <span>{price}</span>
      <button onClick={() => onAdd(props.product)}>Add to cart</button>
    </li>
  );

  return <>{productData}</>;
};

export default ProductItem;
