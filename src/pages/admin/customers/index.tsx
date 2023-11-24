import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const CustomersListPage = lazy(() => import("./pages/list"));
const CustomersCreatePage = lazy(() => import("./pages/create"));
const CustomersDetailsPage = lazy(() => import("./pages/details"));

function Customers() {
  return (
    <Routes>
      <Route index element={<CustomersListPage />} />
      <Route path="create" element={<CustomersCreatePage />} />
      <Route path=":account_id" element={<CustomersDetailsPage />} />
      <Route path=":account_id/edit" element={<CustomersCreatePage />} />
    </Routes>
  );
}

export default Customers;
