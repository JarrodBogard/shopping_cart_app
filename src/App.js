import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Products from "./components/Content/Products";
import Notification from "./components/UI/Notification";
import Layout from "./components/Layout/Layout";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.showCart);
  const [notification, setNotification] = useState(null);
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

  if (shoppingCart.changed) {
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }

  return (
    <>
      {notification && <Notification notification={notification} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
