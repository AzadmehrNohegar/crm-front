import { CustomerDashboardLayout } from "@/layouts/customerDashboard";
import { PrivateRoute } from "@/shared/privateRoute";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AuthPage = lazy(() => import("../auth"));
const DashboardPage = lazy(() => import("./dashboard"));
const ProductsPage = lazy(() => import("./products"));
const CheckoutPage = lazy(() => import("./checkout"));
const WalletPage = lazy(() => import("./wallet"));
const SupportPage = lazy(() => import("./support"));
const AccountPage = lazy(() => import("./account"));
const OrdersPage = lazy(() => import("./orders"));
const NotificationPage = lazy(() => import("./notification"));

function CustomerRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<CustomerDashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products/*" element={<ProductsPage />} />
          <Route path="support/*" element={<SupportPage />} />
          <Route path="orders/*" element={<OrdersPage />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="notification" element={<NotificationPage />} />
        </Route>
      </Route>
      <Route path="auth/*" element={<AuthPage />} />
    </Routes>
  );
}

export { CustomerRoutes };
