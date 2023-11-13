import { Outlet } from "react-router-dom";
import { AdminDashboardHeader } from "./partials/header";
import { AdminDashboardSidebar } from "./partials/sidebar";
import { Fragment, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { MovasaghLoading } from "@/shared/movasaghLoading";

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
            <Suspense fallback={<MovasaghLoading />}>
              <Outlet />
            </Suspense>
          </section>
        </main>
      </section>
    </Fragment>
  );
}

export { AdminDashboardLayout };
