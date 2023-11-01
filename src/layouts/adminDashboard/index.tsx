import { Outlet } from "react-router-dom";
import { AdminDashboardHeader } from "./partials/header";
import { AdminDashboardSidebar } from "./partials/sidebar";
import { Fragment } from "react";
import { Helmet } from "react-helmet-async";

function AdminDashboardLayout() {
  return (
    <Fragment>
      <Helmet>
        <body className="admin-panel" />
      </Helmet>
      <section className="flex relative items-center h-screen overflow-y-hidden">
        <AdminDashboardSidebar />
        <main className="w-5/6 h-screen">
          <AdminDashboardHeader />
          <section className="p-5 h-container overflow-y-auto">
            <Outlet />
          </section>
        </main>
      </section>
    </Fragment>
  );
}

export { AdminDashboardLayout };
