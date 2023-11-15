import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const NotificationList = lazy(() => import("./pages/list"));
const NotificationCreate = lazy(() => import("./pages/create"));
const NotificationDetails = lazy(() => import("./pages/details"));

function Notification() {
  return (
    <Routes>
      <Route index element={<NotificationList />} />
      <Route path="create" element={<NotificationCreate />} />
      <Route path=":notification" element={<NotificationDetails />} />
      <Route path=":notification/edit" element={<NotificationCreate />} />
    </Routes>
  );
}

export default Notification;
