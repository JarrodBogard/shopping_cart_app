const ProductItem = (props) => {
  const { title, description, price } = props.product;

  const productData = (
    <li>
      <h2>{title}</h2>
      <p>
        <span>{description}</span>
      </p>
      <span>{price}</span>
    </li>
  );

  return <>{productData}</>;
};

export default ProductItem;
