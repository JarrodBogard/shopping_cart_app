import { useState } from "react";
import Navigation from "./components/Navigation";
import CartModal from "./components/CartModal";
import Products from "./components/Products";

function App() {
  const [toggleCart, setToggleCart] = useState(false);
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
    if (shoppingCart.products.length === 0) return;

    let existingItem = shoppingCart.products.find(
      (product) => product.id === id
    );

    if (existingItem.quantity > 1) {
      existingItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
        totalPrice: existingItem.totalPrice - existingItem.price,
      };

      let existingItemIndex = shoppingCart.products.findIndex(
        (product) => product.id === existingItem.id
      );

      setshoppingCart((prevState) => {
        prevState.products[existingItemIndex] = existingItem;
        return {
          products: [...prevState.products],
          totalQuantity: prevState.totalQuantity - 1,
          totalAmount: prevState.totalAmount - existingItem.price,
        };
      });
    } else {
      const updatedProducts = shoppingCart.products.filter(
        (product) => product.id !== id
      );

      setshoppingCart((prevState) => {
        return {
          products: [...updatedProducts],
          totalQuantity: prevState.totalQuantity - 1,
          totalAmount: prevState.totalAmount - existingItem.price,
        };
      });
    }
  };

  const toggleCartHandler = () => {
    console.log(toggleCart);
    setToggleCart(!toggleCart);
  };

  return (
    <div className="App">
      <Navigation
        cartQuantity={shoppingCart.totalQuantity}
        onToggle={toggleCartHandler}
      />
      {toggleCart && (
        <CartModal
          data={shoppingCart}
          onAdd={addToCartHandler}
          onRemove={removeFromCartHandler}
        />
      )}
      <Products onAdd={addToCartHandler} />
    </div>
  );
}

export default App;
