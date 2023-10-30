import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const SupportCreatePage = lazy(() => import("./pages/create"));
const SupportDetailsPage = lazy(() => import("./pages/details"));
const SupportListPage = lazy(() => import("./pages/list"));

function Support() {
  return (
    <Routes>
      <Route index element={<SupportListPage />} />
      <Route path="create" element={<SupportCreatePage />} />
      <Route path=":ticket_id" element={<SupportDetailsPage />} />
    </Routes>
  );
}

export default Support;
