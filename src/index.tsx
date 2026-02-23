import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";

import App from "./components/App";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root now found");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: <h1>About</h1>,
      },
      {
        path: "/tests",
        element: <h1>Tests</h1>,
      },
      {
        path: "/articles",
        element: <h1>Articles</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
