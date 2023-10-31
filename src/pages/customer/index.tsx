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

function CustomerRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<CustomerDashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products/*" element={<ProductsPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="support/*" element={<SupportPage />} />
        </Route>
      </Route>
      <Route path="auth/*" element={<AuthPage />} />
    </Routes>
  );
}

export { CustomerRoutes };
