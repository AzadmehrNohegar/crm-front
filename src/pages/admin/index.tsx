import { AdminDashboardLayout } from "@/layouts/adminDashboard";
import { PrivateRoute } from "@/shared/privateRoute";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AuthPage = lazy(() => import("../auth"));
const DashboardPage = lazy(() => import("./dashboard"));
const AccountPage = lazy(() => import("./account"));
const SettingsPage = lazy(() => import("./settings"));
const ProductsPage = lazy(() => import("./products"));
const NotificationPage = lazy(() => import("./notification"));

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<AdminDashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="products/*" element={<ProductsPage />} />
          <Route path="notification/*" element={<NotificationPage />} />
          <Route path="orders/*" element={<>orders</>} />
          <Route path="users/*" element={<>users</>} />
          <Route path="support/*" element={<>support</>} />
        </Route>
      </Route>
      <Route path="auth/*" element={<AuthPage />} />
    </Routes>
  );
}

export { AdminRoutes };
