import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <header>
      <nav className={classes.navbar}>
        <div>
          <span className={classes.logo}>Movies</span>
        </div>
        <div>
          <span className={classes.cart}>Cart</span>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
