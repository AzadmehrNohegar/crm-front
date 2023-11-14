import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const ProductsCategoriesListPage = lazy(() => import("./pages/list"));
const ProductsCategoriesCreatePage = lazy(() => import("./pages/create"));

function ProductsCategories() {
  return (
    <Routes>
      <Route index element={<ProductsCategoriesListPage />} />
      <Route path="create" element={<ProductsCategoriesCreatePage />} />
      <Route path=":category" element={<ProductsCategoriesCreatePage />} />
    </Routes>
  );
}

export default ProductsCategories;
