import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const OrdersListPage = lazy(() => import("./pages/list"));
const OrderDetailsPage = lazy(() => import("./pages/details"));

function Orders() {
  return (
    <Routes>
      <Route index element={<OrdersListPage />} />
      <Route path=":order_id" element={<OrderDetailsPage />} />
    </Routes>
  );
}

export default Orders;
