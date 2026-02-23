import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import { Suspense } from "react";

import App from "@/components/App";
import { LazyAbout } from "@/pages/about/About.lazy";
import { LazyTests } from "@/pages/tests/Tests.lazy";
import { LazyArticles } from "@/pages/articles/Articles.lazy";

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
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyAbout />
          </Suspense>
        ),
      },
      {
        path: "/tests",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyTests />
          </Suspense>
        ),
      },
      {
        path: "/articles",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyArticles />
          </Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
