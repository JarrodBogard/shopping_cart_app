import CartButton from "../Cart/CartButton";

const Navigation = () => {
  return (
    <header>
      <h1>Movies</h1>
      <nav>
        <ul>
          <li>
            <CartButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
