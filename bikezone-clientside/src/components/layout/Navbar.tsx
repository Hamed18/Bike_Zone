import { NavLink } from "react-router-dom";
import logo from "@/assets/logo.svg";
import LoginMenu from "../menu/LoginMenu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";

type NavItem = {
  to: string;
  label: string;
  show: boolean;
};

const Navbar = () => {
  const user = useAppSelector(selectCurrentUser);

  const [isOpen, setIsOpen] = useState(false);
  // const user = false; // This should come from your auth context

  const navItems: NavItem[] = [
    { to: "/", label: "Home", show: true },
    { to: "/about", label: "About", show: true },
    { to: "/products", label: "Products", show: true },
    { to: "/contact", label: "Contact Us", show: true },
    { to: "/login", label: "Login", show: !user },
  ];

  return (
    <nav className="shadow-xl bg-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-10 h-10 md:w-14 md:h-14" />
            <h2 className="flex flex-col justify-center uppercase">
              <span className="font-bold text-xl md:text-3xl">Bike Zone</span>
              <span className="-mt-1 font-normal text-xs md:text-sm tracking-widest">
                Upgrade your ride
              </span>
            </h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems
              .filter((item) => item.show)
              .map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md font-medium ${
                      isActive
                        ? "border-2 border-black"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            {user && <LoginMenu />}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-3 mt-10 px-5">
                  {navItems
                    .filter((item) => item.show)
                    .map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                          `px-3 py-2 rounded-md text-base font-medium ${
                            isActive
                              ? "border-2 border-black"
                              : "text-gray-700 hover:bg-gray-100"
                          }`
                        }
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  {user && <LoginMenu />}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
