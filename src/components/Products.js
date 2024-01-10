import { useState, useEffect } from "react";

let isInitial = true;

const DUMMY_DATA = [
  {
    id: "p1",
    title: "Mission Impossible",
    description: "Ethan Hunt kills bad guys",
    releaseYear: 1996,
    price: 20.49,
  },
  {
    id: "p2",
    title: "Bourne Identity",
    description: "Jason Bourne kills bad guys",
    releaseYear: 2002,
    price: 19.99,
  },
  {
    id: "p3",
    title: "Lord Of The Rings",
    description: "Hobbits save the world",
    releaseYear: 2001,
    price: 29.99,
  },
];
const Products = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    setData(DUMMY_DATA);
  }, []);

  const movieData = data.map((movie) => (
    <li key={movie.id}>
      <h2>{movie.title}</h2>
      <p>
        <span>{movie.description}</span>
      </p>
      <span>{movie.price}</span>
    </li>
  ));

  return <ul>{movieData}</ul>;
};

export default Products;
