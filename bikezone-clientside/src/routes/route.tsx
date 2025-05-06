import App from "@/App";
import AdminRoute from "@/components/layout/AdminRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import About from "@/pages/About";
import AdminDash from "@/pages/admin/AdminDash";
import ManageOrders from "@/pages/admin/ManageOrders";
import ManageProducts from "@/pages/admin/ManageProducts";
import ManageUsers from "@/pages/admin/ManageUsers";
// import AllProducts2 from "@/pages/AllProduct2";
import AllProducts from "@/pages/AllProducts";
import Checkout from "@/pages/Checkout";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import Contact from "@/pages/home/Contact/Contact";
import Home from "@/pages/home/Home";
import ProductDetails from "@/pages/home/Product/ProductDetails";
import Login from "@/pages/Login";
import OrderDetails from "@/pages/order/Order";
import OrderVerification from "@/pages/order/VerifyOrder";
import Register from "@/pages/Register";
import UserDash from "@/pages/user/UserDash";
import UserOrder from "@/pages/user/UserOrder";
import UserProfile from "@/pages/user/UserProfile";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/products/",
        element: <AllProducts />,
      },
      {
        path: "/product/:productId",
        element: <ProductDetails />,
      },
      {
        path: "/checkout/:productId",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "/admin/dash",
        element: <AdminDash />,
      },
      {
        path: "manage-products",
        element: <ManageProducts />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-orders",
        element: <ManageOrders />,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dash",
        element: <UserDash />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "orders",
        element: <UserOrder />,
      },
      {
        path: "order",
        element: <OrderDetails />,
      },
      {
        path: "order/verify",
        element: <OrderVerification />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
