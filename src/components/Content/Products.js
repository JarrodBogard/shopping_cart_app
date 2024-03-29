import ProductItem from "./ProductItem";

const DUMMY_DATA = [
  {
    id: "p1",
    title: "Mission Impossible",
    description: "Ethan Hunt kills bad guys",
    releaseYear: 1996,
    price: 20.49,
  },
  {
    id: "p2",
    title: "Bourne Identity",
    description: "Jason Bourne kills bad guys",
    releaseYear: 2002,
    price: 19.99,
  },
  {
    id: "p3",
    title: "Lord Of The Rings",
    description: "Hobbits save the world",
    releaseYear: 2001,
    price: 29.99,
  },
];
const Products = (props) => {
  const productsData = DUMMY_DATA.map((product) => (
    <ProductItem key={product.id} product={product} onAdd={props.onAdd} />
  ));

  return <ul>{productsData}</ul>;
};

export default Products;
