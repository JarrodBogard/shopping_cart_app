import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Cart from "./components/Cart";
import Products from "./components/Products";

let isInitial = true;

function App() {
  const [toggleCart, setToggleCart] = useState(false);
  const [shoppingCart, setshoppingCart] = useState({
    products: [],
    totalQuantity: 0,
    totalAmount: 0,
    changed: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://react-course-http-tutorial-default-rtdb.firebaseio.com/shoppingCart.json`
      );

      if (!response.ok) {
        throw new Error("Unable to retrieve data");
      }

      const responseData = await response.json();

      if (responseData.products) {
        setshoppingCart(responseData);
      } else setshoppingCart({ ...responseData, products: [] });

      // setshoppingCart({
      //   products: responseData.products || [],
      //   totalQuantity: responseData.totalQuantity || 0,
      //   totalAmount: responseData.totalAmount || 0,
      // });
    };

    fetchData();
  }, []);

  console.log(shoppingCart, "shopping cart App.js");
  useEffect(() => {
    const sendFetchData = async () => {
      const response = await fetch(
        `https://react-course-http-tutorial-default-rtdb.firebaseio.com/shoppingCart.json`,
        {
          method: "PUT",
          body: JSON.stringify(shoppingCart),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to send data");
      }

      console.log("data sent successfully");
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    if (shoppingCart.changed) {
      sendFetchData().catch((error) => console.log(error));
    }
  }, [shoppingCart]);

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

    let existingProduct = shoppingCart.products.find(
      (product) => product.id === newProduct.id
    );

    let updatedProduct;

    if (existingProduct) {
      updatedProduct = {
        ...existingProduct,
        quantity: existingProduct.quantity + 1,
        totalPrice: existingProduct.totalPrice + existingProduct.price,
      };

      const existingProductIndex = shoppingCart.products.findIndex(
        (product) => product.id === existingProduct.id
      );

      let updatedProducts;

      setshoppingCart((prevState) => {
        updatedProducts = [...prevState.products];
        updatedProducts[existingProductIndex] = updatedProduct;

        return {
          products: updatedProducts,
          totalQuantity: prevState.totalQuantity + 1,
          totalAmount: prevState.totalAmount + newProduct.price,
          changed: true,
        };
      });
    } else {
      setshoppingCart((prevState) => {
        return {
          products: [...prevState.products, newProduct],
          totalQuantity: prevState.totalQuantity + 1,
          totalAmount: prevState.totalAmount + newProduct.price,
          changed: true,
        };
      });
    }
  };

  const removeFromCartHandler = (id) => {
    if (shoppingCart.products.length === 0) return;

    let existingProduct = shoppingCart.products.find(
      (product) => product.id === id
    );

    let updatedProduct;

    if (existingProduct.quantity > 1) {
      updatedProduct = {
        ...existingProduct,
        quantity: existingProduct.quantity - 1,
        totalPrice: existingProduct.totalPrice - existingProduct.price,
      };

      let existingProductIndex = shoppingCart.products.findIndex(
        (product) => product.id === existingProduct.id
      );

      let updatedProducts;

      setshoppingCart((prevState) => {
        updatedProducts = [...prevState.products];
        updatedProducts[existingProductIndex] = updatedProduct;

        return {
          products: updatedProducts,
          totalQuantity: prevState.totalQuantity - 1,
          totalAmount: prevState.totalAmount - existingProduct.price,
          changed: true,
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
          totalAmount: prevState.totalAmount - existingProduct.price,
          changed: true,
        };
      });
    }
  };

  const toggleCartHandler = () => {
    setToggleCart(!toggleCart);
  };

  return (
    <div className="App">
      <Navigation
        cartQuantity={shoppingCart.totalQuantity}
        onToggle={toggleCartHandler}
      />
      {toggleCart && (
        <Cart
          data={shoppingCart}
          onAdd={addToCartHandler}
          onRemove={removeFromCartHandler}
          onToggle={toggleCartHandler}
        />
      )}
      <Products onAdd={addToCartHandler} />
    </div>
  );
}

export default App;
