import { Outlet } from "react-router-dom";
import { DashboardHeader } from "./partials/header";
import { DashboardSidebar } from "./partials/sidebar";

function DashboardLayout() {
  return (
    <section className="flex relative items-center h-screen overflow-y-hidden">
      <DashboardSidebar />
      <main className="w-5/6 h-screen">
        <DashboardHeader />
        <section className="p-5 h-container overflow-y-scroll">
          <Outlet />
        </section>
      </main>
    </section>
  );
}

export { DashboardLayout };
