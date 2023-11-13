import { MovasaghSplashScreen } from "@/shared/movasaghSplashScreen";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthLoginPage = lazy(() => import("./pages/login"));
const AuthRegisterPage = lazy(() => import("./pages/register"));
const AuthResultPage = lazy(() => import("./pages/result"));

function Auth() {
  return (
    <Suspense fallback={<MovasaghSplashScreen />}>
      <Routes>
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<AuthLoginPage />} />
        <Route path="register" element={<AuthRegisterPage />} />
        <Route path="result" element={<AuthResultPage />} />
      </Routes>
    </Suspense>
  );
}

export default Auth;
