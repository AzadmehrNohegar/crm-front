import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthPage = lazy(() => import("./auth"));

function BasePage() {
  return (
    <Routes>
      <Route index element={<Navigate to="auth" />} />
      <Route path="auth/*" element={<AuthPage />} />
    </Routes>
  );
}

export default BasePage;
