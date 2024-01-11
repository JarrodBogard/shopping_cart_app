import classes from "./Navigation.module.css";

const Navigation = ({ cartQuantity, onToggle }) => {
  return (
    <header>
      <nav className={classes.navbar}>
        <div>
          <span className={classes.logo}>Movies</span>
        </div>
        <div>
          <span onClick={onToggle} className={classes.cart}>
            Cart: {cartQuantity}
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
