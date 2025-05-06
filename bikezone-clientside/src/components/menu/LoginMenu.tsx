import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuPortal,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  // DropdownMenuSub,
  // DropdownMenuSubContent,
  // DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGeSingletUserQuery } from "@/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { Loader, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const LoginMenu = () => {
  const user = useAppSelector(selectCurrentUser);
  const role: string | undefined = user?.role;

  const {
    data: userData,
    isLoading: userLoading,
  } = useGeSingletUserQuery(user?._id, {
    refetchOnMountOrArgChange: true,
  });

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    const toastId = toast.loading("Logging out...");
    dispatch(logout());
    toast.success("User Logout!", { id: toastId, duration: 5000 });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button> {userLoading ? <Loader /> : userData?.data?.name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <span className="text-sm ms-2">
            {" "}
            {role === "admin" ? "Hello Admin" : "My Account"}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={role === "admin" ? "/admin/dash" : "/user/dash"}>
            <DropdownMenuItem className="cursor-pointer">
              Dashboard
            </DropdownMenuItem>
          </Link>
          {/* <DropdownMenuItem>
            Order
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex justify-between cursor-pointer"
          onClick={() => handleLogout()}
        >
          Log out <LogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LoginMenu;
