import { useState } from "react";
import classes from "./App.module.scss";

const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  return (
    <div>
      <h1>{count}</h1>
      <button className={classes.button} onClick={increment}>
        <span>increment</span>
      </button>
      <button className={classes.button} onClick={decrement}>
        <span>decrement</span>
      </button>
    </div>
  );
};

export default App;
