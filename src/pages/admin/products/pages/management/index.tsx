import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const ProductsManagementListPage = lazy(() => import("./pages/list"));
const ProductsManagementCreatePage = lazy(() => import("./pages/create"));
const ProductsManagementDetailsPage = lazy(() => import("./pages/details"));

function ProductsManagement() {
  return (
    <Routes>
      <Route index element={<ProductsManagementListPage />} />
      <Route path="create" element={<ProductsManagementCreatePage />} />
      <Route path=":product_id" element={<ProductsManagementDetailsPage />} />
    </Routes>
  );
}

export default ProductsManagement;
