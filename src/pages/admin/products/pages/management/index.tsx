import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const ProductsManagementListPage = lazy(() => import("./pages/list"));
const ProductsManagementCreatePage = lazy(() => import("./pages/create"));

function ProductsManagement() {
  return (
    <Routes>
      <Route index element={<ProductsManagementListPage />} />
      <Route path="create" element={<ProductsManagementCreatePage />} />
    </Routes>
  );
}

export default ProductsManagement;
