import CartButton from "./CartButton";
import classes from "./Navigation.module.css";

const Navigation = ({ cartQuantity, onToggle }) => {
  return (
    <header>
      <h1>Movies</h1>
      <nav>
        <ul>
          <li>
            <CartButton onToggle={onToggle} cartQuantity={cartQuantity} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
