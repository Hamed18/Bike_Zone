import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Menu,
  X,
  ChevronLeft,
  User,
  Package,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const role: string | undefined = user?.role;
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    const toastId = toast.loading("Logging out....");
    dispatch(logout());
    navigate("/");
    toast.success("User Logout!", { id: toastId, duration: 5000 });
  };

  const adminItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dash" },
    { name: "Users", icon: Users, href: "/admin/manage-users" },
    { name: "Products", icon: ShoppingCart, href: "/admin/manage-products" },
    { name: "Manage Orders", icon: Package, href: "/admin/manage-orders" },
  ];

  const userItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/user/dash" },
    { name: "Profile", icon: User, href: "/user/profile" },
    { name: "My Orders", icon: Package, href: "/user/orders" },
  ];

  const currentItems = role === "admin" ? adminItems : userItems;
  const panelTitle = role === "admin" ? "Admin Panel" : "My Account";

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r bg-background",
          "transition-all duration-300 ease-in-out",
          collapsed ? "w-[80px]" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            {!collapsed && (
              <h4 className={`text-xl font-semibold`}>{panelTitle}</h4>
            )}
            <Button
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="h-8 w-8"
            >
              <ChevronLeft
                className={cn(
                  "h-4 w-4 transition-transform",
                  collapsed && "rotate-180"
                )}
              />
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <nav className="p-2 space-y-1">
              {currentItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center h-10 mb-1 px-4 rounded-md transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground",
                      collapsed ? "justify-center px-0" : "justify-start px-4"
                    )
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </NavLink>
              ))}
            </nav>
          </ScrollArea>

          {/* Logout Button - Desktop */}
          <div className="p-2 border-t">
            <Button
              className={cn(
                "w-full justify-center h-10",
                collapsed ? "justify-center px-0" : "px-4"
              )}
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span className="ml-3">Logout</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed z-50 md:hidden flex flex-col w-64 border-r bg-background",
          "h-full transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h4 className="text-xl font-semibold">{panelTitle}</h4>
            <Button
              size="icon"
              onClick={() => setMobileOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <nav className="p-2 space-y-1">
              {currentItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center h-10 mb-1 px-4 rounded-md transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground"
                    )
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="ml-3">{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </ScrollArea>

          {/* Logout Button - Mobile */}
          <div className="p-2 border-t">
            <Button
              className="w-full justify-center h-10 px-4"
              onClick={() => handleLogout()}
            >
              <LogOut className="h-4 w-4" />
              <span className="ml-3">Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center p-4 border-b md:hidden">
          <Button
            size="icon"
            onClick={() => setMobileOpen(true)}
            className="h-8 w-8"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <h4 className="ml-2 text-lg font-semibold">{panelTitle}</h4>
        </header>

        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
