import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const ProductsManagementPage = lazy(() => import("./pages/management"));
const ProductsCategoriesPage = lazy(() => import("./pages/categories"));

function Products() {
  return (
    <Routes>
      <Route index element={<Navigate to="management" />} />
      <Route path="categories" element={<ProductsCategoriesPage />} />
      <Route path="management/*" element={<ProductsManagementPage />} />
    </Routes>
  );
}

export default Products;
