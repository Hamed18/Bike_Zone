import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);

  if (!token) {
    return <Navigate to={`/login`} replace={true} />;
  }
  if (user?.role === "customer") {
    return children;
  } else return <Navigate to={`/`} replace={true} />;
};

export default ProtectedRoute;
