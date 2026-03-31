import { createBrowserRouter } from "react-router";
import { Landing, Generate, Verify, About, DemoOne, Auth } from "./pages";
import { Layout } from "./components";
import { PrivateRoute } from "./components/private-route";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { path: "login", Component: Auth },
      {
        path: "/",
        Component: PrivateRoute,
        children: [
          { index: true, Component: Landing },
          { path: "generate", Component: Generate },
          { path: "verify", Component: Verify },
          { path: "about", Component: About },
          { path: "demo", Component: DemoOne },
        ]
      }
    ],
  },
]);