import { useState } from "react";
import classes from "@/components/App.module.scss";
import { Link, Outlet } from "react-router";
import AvatarPng from "@/assets/travis.jpg";
import Tree from "@/assets/tree.svg";

const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  if (__PLATFORM__ === "desktop") {
    return <div>isdecktop</div>;
  }

  if (__PLATFORM__ === "mobile") {
    return <div>ismobile</div>;
  }

  return (
    <div>
      <h1>PLATFORM={__PLATFORM__}</h1>
      <img src={AvatarPng}></img>
      <br />
      <Tree fill="#999" width={200} height={200} />
      <br />
      <Link to={"about"}>about</Link>
      <br />
      <Link to={"tests"}>tests</Link>
      <br />
      <Link to={"articles"}>articles</Link>
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
