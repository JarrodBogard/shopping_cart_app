import { useState } from "react";
import Navigation from "./components/Navigation";
import Products from "./components/Products";

function App() {
  const [shoppingCart, setshoppingCart] = useState({
    products: [],
    totalQuantity: 0,
    totalAmount: 0,
  });

  const addToCartHandler = (product) => {
    const newProduct = {
      id: product.id,
      title: product.title,
      description: product.description,
      releaseYear: product.releaseYear,
      price: product.price,
      quantity: 1,
      totalPrice: product.price,
    };

    let existingItem = shoppingCart.products.find(
      (product) => product.id === newProduct.id
    );
    if (existingItem) {
      existingItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
        totalPrice: existingItem.totalPrice + existingItem.price,
      };

      const existingItemIndex = shoppingCart.products.findIndex(
        (product) => product.id === existingItem.id
      );

      setshoppingCart((prevState) => {
        prevState.products[existingItemIndex] = existingItem;

        return {
          products: [...prevState.products],
          totalQuantity: prevState.totalQuantity + 1,
          totalAmount: prevState.totalAmount + newProduct.price,
        };
      });
    } else {
      setshoppingCart((prevState) => {
        return {
          products: [...prevState.products, newProduct],
          totalQuantity: prevState.totalQuantity + 1,
          totalAmount: prevState.totalAmount + newProduct.price,
        };
      });
    }
  };

  const removeFromCartHandler = (id) => {
    const updatedProducts = shoppingCart.filter((product) => product.id !== id);

    setshoppingCart((prevState) => {
      return {
        products: [updatedProducts],
        totalQuantity: prevState.totalQuantity - 1,
        totalAmount: prevState.totalAmount - 1,
      };
    });
  };

  console.log(shoppingCart, "cart");

  return (
    <div className="App">
      <Navigation cartQuantity={shoppingCart.totalQuantity} />
      <Products />
      <button
        onClick={() =>
          addToCartHandler({
            id: "p4",
            title: "Mission Impossible 3",
            description: "More impossible than ever",
            releaseYear: 2009,
            price: 20.5,
          })
        }
      >
        click
      </button>
    </div>
  );
}

export default App;
