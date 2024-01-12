import Navigation from "./Navigation";
const Layout = (props) => {
  return (
    <>
      <Navigation cartQuantity={props.cartQuantity} onToggle={props.onToggle} />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
