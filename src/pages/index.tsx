import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AuthPage = lazy(() => import("./auth"));

function BasePage() {
  return (
    <Routes>
      <Route index element={<>dashjboard</>} />
      <Route path="auth/*" element={<AuthPage />} />
    </Routes>
  );
}

export default BasePage;
