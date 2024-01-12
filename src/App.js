import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";
import { fetchCartData, sendCartData } from "./store/cart-actions";
import Cart from "./components/Cart/Cart";
import Products from "./components/Content/Products";
import Notification from "./components/UI/Notification";
import Layout from "./components/Layout/Layout";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;

      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  if (cart.changed) {
    setTimeout(() => {
      dispatch(uiActions.removeNotification());
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
