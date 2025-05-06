import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
      <Outlet />
      </div>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default MainLayout;
