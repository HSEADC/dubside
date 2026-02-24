import classes from "@/pages/App.module.scss";
import { Link, Outlet } from "react-router";

const App = () => {
  return (
    <div>
      <Link to={"/"}>guide</Link>
      <br />
      <Link to={"/about"}>about</Link>
      <br />
      <Link to={"/tests"}>tests</Link>
      <br />
      <Link to={"/articles"}>articles</Link>

      <Outlet />
      {/* Child routes are rendered through the <Outlet/> in the parent route. */}

      <div>FOOTER</div>
    </div>
  );
};

export default App;
