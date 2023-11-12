import { Outlet } from "react-router-dom";
import { CustomerDashboardHeader } from "./partials/header";
import { CustomerDashboardSidebar } from "./partials/sidebar";
import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { CustomerDashboardNavigation } from "./partials/nav";
import { useMediaQuery } from "usehooks-ts";

function CustomerDashboardLayout() {
  const matches = useMediaQuery("(max-width: 1280px)");

  return (
    <Fragment>
      <Helmet>
        <body className="customer-panel" />
      </Helmet>
      <section className="flex relative items-center h-screen overflow-y-hidden">
        {!matches ? <CustomerDashboardSidebar /> : null}
        <main className="w-full xl:w-5/6 h-screen">
          <CustomerDashboardHeader />
          <section className="p-5 h-container overflow-y-auto pb-16 xl:pb-0">
            <Outlet />
          </section>
          {matches ? <CustomerDashboardNavigation /> : null}
        </main>
      </section>
    </Fragment>
  );
}

export { CustomerDashboardLayout };
