import { DashboardLayout } from "@/layouts/dashboard";
import { PrivateRoute } from "@/shared/privateRoute";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AuthPage = lazy(() => import("./auth"));
const DashboardPage = lazy(() => import("./dashboard"));
const ProductsPage = lazy(() => import("./products"));

function BasePage() {
  return (
    <Routes>
      <Route
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="products/*" element={<ProductsPage />} />
      </Route>
      <Route path="auth/*" element={<AuthPage />} />
    </Routes>
  );
}

export default BasePage;
