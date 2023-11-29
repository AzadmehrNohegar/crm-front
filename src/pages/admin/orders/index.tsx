import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const OrdersListPage = lazy(() => import("./pages/list"));
const OrdersCreatePage = lazy(() => import("./pages/create"));
const OrdersDetailsPage = lazy(() => import("./pages/details"));
const OrdersSupplyPage = lazy(() => import("./pages/supply"));

function Orders() {
  return (
    <Routes>
      <Route index element={<OrdersListPage />} />
      <Route path="create" element={<OrdersCreatePage />} />
      <Route path=":order_id" element={<OrdersDetailsPage />} />
      <Route path=":order_id/supply" element={<OrdersSupplyPage />} />
    </Routes>
  );
}

export default Orders;
