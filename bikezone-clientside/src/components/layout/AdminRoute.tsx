import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";

import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);

  if (!token) {
    return <Navigate to={`/login`} replace={true} />;
  }

  if (user?.role === "admin") {
    return children;
  } else return <Navigate to={`/`} replace={true} />;
};

export default AdminRoute;
