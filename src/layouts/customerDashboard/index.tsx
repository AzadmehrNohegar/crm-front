import { Outlet } from "react-router-dom";
import { CustomerDashboardHeader } from "./partials/header";
import { CustomerDashboardSidebar } from "./partials/sidebar";

function CustomerDashboardLayout() {
  return (
    <section className="flex relative items-center h-screen overflow-y-hidden">
      <CustomerDashboardSidebar />
      <main className="w-5/6 h-screen">
        <CustomerDashboardHeader />
        <section className="p-5 h-container overflow-y-scroll">
          <Outlet />
        </section>
      </main>
    </section>
  );
}

export { CustomerDashboardLayout };
