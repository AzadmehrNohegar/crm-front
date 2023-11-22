import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const ProductsListPage = lazy(() => import("./pages/list"));
const ProductDetailsPage = lazy(() => import("./pages/details"));

function Products() {
  return (
    <Routes>
      <Route index element={<ProductsListPage />} />
      <Route path=":product_id" element={<ProductDetailsPage />} />
    </Routes>
  );
}

export default Products;
