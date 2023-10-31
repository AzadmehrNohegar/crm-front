import { useAuthStore } from "@/store/auth";
import { CustomerRoutes } from "./customer";
import { AdminRoutes } from "./admin";

function BasePage() {
  const { role } = useAuthStore();

  if (role === "ADMIN") return <AdminRoutes />;

  return <CustomerRoutes />;
}

export default BasePage;
