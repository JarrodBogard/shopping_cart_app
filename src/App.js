import { useState, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Products from "./components/Content/Products";
import Notification from "./components/UI/Notification";
import Layout from "./components/Layout/Layout";

let isInitial = true;

function App() {
  const [notification, setNotification] = useState(null);
  const [toggleCart, setToggleCart] = useState(false);
  const [shoppingCart, setshoppingCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://react-course-http-tutorial-default-rtdb.firebaseio.com/shoppingCart.json`
      );

      if (!response.ok) {
        throw new Error("Unable to retrieve data");
      }

      const responseData = await response.json();

      setshoppingCart({
        products: responseData.products || [],
        totalQuantity: responseData.totalQuantity || 0,
        totalAmount: responseData.totalAmount || 0,
        changed: false,
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;

      return;
    }
    const sendFetchData = async () => {
      setNotification({
        status: "pending",
        title: "Sending",
        message: "Sending fetch request.",
      });
      const response = await fetch(
        `https://react-course-http-tutorial-default-rtdb.firebaseio.com/shoppingCart.json`,
        {
          method: "PUT",
          body: JSON.stringify({ shoppingCart }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to send data");
      }

      setNotification({
        status: "success",
        title: "Sent",
        message: "Data sent successfully.",
      });

      console.log("data sent successfully");
    };

    if (shoppingCart.changed) {
      sendFetchData().catch((error) =>
        setNotification({
          status: "error",
          title: "Failed",
          message: "Unable to process request",
        })
      );
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

  if (shoppingCart.changed) {
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }

  return (
    <>
      {notification && <Notification notification={notification} />}
      <Layout
        cartQuantity={shoppingCart.totalQuantity}
        onToggle={toggleCartHandler}
      >
        {toggleCart && (
          <Cart
            data={shoppingCart}
            onAdd={addToCartHandler}
            onRemove={removeFromCartHandler}
            onToggle={toggleCartHandler}
          />
        )}
        <Products onAdd={addToCartHandler} />
      </Layout>
    </>
  );
}

export default App;
