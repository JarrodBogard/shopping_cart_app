import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://react-course-http-tutorial-default-rtdb.firebaseio.com/shoppingCart.json`
      );

      if (!response.ok) {
        throw new Error("Unable to retrieve data");
      }

      const responseData = await response.json();
      return responseData;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Fetching data failed",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending cart data...",
      })
    );

    const sendFetchData = async () => {
      const response = await fetch(
        `https://react-course-http-tutorial-default-rtdb.firebaseio.com/shoppingCart.json`,
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send card data.");
      }
    };
    try {
      await sendFetchData();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Data sent successfully.",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Failed to send card data.",
        })
      );
    }
  };
};
