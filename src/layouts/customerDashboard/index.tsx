import { Outlet } from "react-router-dom";
import { CustomerDashboardHeader } from "./partials/header";
import { CustomerDashboardSidebar } from "./partials/sidebar";
import { Fragment } from "react";
import { Helmet } from "react-helmet-async";

function CustomerDashboardLayout() {
  return (
    <Fragment>
      <Helmet>
        <body className="customer-panel" />
      </Helmet>
      <section className="flex relative items-center h-screen overflow-y-hidden">
        <CustomerDashboardSidebar />
        <main className="w-5/6 h-screen">
          <CustomerDashboardHeader />
          <section className="p-5 h-container overflow-y-auto">
            <Outlet />
          </section>
        </main>
      </section>
    </Fragment>
  );
}

export { CustomerDashboardLayout };
