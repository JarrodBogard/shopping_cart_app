import classes from "./Navigation.module.css";

const Navigation = ({ cartQuantity }) => {
  return (
    <header>
      <nav className={classes.navbar}>
        <div>
          <span className={classes.logo}>Movies</span>
        </div>
        <div>
          <span className={classes.cart}>Cart: {cartQuantity}</span>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
