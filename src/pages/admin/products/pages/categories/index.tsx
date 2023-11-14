import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const ProductsCategoriesList = lazy(() => import("./pages/list"));

function ProductsCategories() {
  return (
    <Routes>
      <Route index element={<ProductsCategoriesList />} />
      <Route path="create" element={<>crteate</>} />
    </Routes>
  );
}

export default ProductsCategories;
