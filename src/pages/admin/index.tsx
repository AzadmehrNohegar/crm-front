import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AuthPage = lazy(() => import("../auth"));

function AdminRoutes() {
  return (
    <Routes>
      <Route index element={<>gg</>} />
      <Route path="auth/*" element={<AuthPage />} />
    </Routes>
  );
}

export { AdminRoutes };
