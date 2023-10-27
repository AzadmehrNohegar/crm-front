import { useAuthStore } from "@/store/auth";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { access } = useAuthStore();
  if (!access) return <Navigate to="/auth" />;
  return <Outlet />;
}

export { PrivateRoute };
