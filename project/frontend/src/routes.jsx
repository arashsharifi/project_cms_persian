import Products from "./Pages/Products/Products";
import Comments from "./Pages/Comments/Comments";
import Users from "./Pages/Users/Users";
import Orders from "./Pages/Orders/Orders";
import Offers from "./Pages/Offers/Offers";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "/products", element: <Products /> },
      { path: "/comments", element: <Comments /> },
      { path: "/users", element: <Users /> },
      { path: "/orders", element: <Orders /> },
      { path: "/offers", element: <Offers /> },
    ],
  },
]);

export const AppRoute = () => {
  return <RouterProvider router={routes} />;
};
