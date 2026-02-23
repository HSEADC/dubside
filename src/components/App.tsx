import { useState } from "react";
import classes from "./App.module.scss";
import { Link, Outlet } from "react-router";

const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  return (
    <div>
      <Link to={"about"}>about</Link>
      <br />
      <Link to={"tests"}>tests</Link>

      <h1>{count}</h1>
      <button className={classes.button} onClick={increment}>
        <span>increment</span>
      </button>
      <button className={classes.button} onClick={decrement}>
        <span>decrement</span>
      </button>
      <Outlet />
      {/* Child routes are rendered through the <Outlet/> in the parent route. */}
    </div>
  );
};

export default App;
