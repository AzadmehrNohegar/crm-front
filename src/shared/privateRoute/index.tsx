import React, { Fragment } from "react";
// import { useAuthStore } from "@/store";
// import { Navigate } from "react-router-dom";

function PrivateRoute({ children }: { children?: React.ReactNode }) {
  // const { access } = useAuthStore();
  // if (!access) return <Navigate to="/auth" />;
  return <Fragment>{children}</Fragment>;
}

export { PrivateRoute };
