import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const ProductsListPage = lazy(() => import("./pages/list"));

function Products() {
  return (
    <Routes>
      <Route index element={<ProductsListPage />} />
    </Routes>
  );
}

export default Products;
