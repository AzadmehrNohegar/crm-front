import {
  AddUser,
  Buy,
  Calling,
  ArrowLeft,
  TwoUsers,
  Wallet,
} from "react-iconly";
import { DashboardCard } from "./partials/dashboardCard";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getOrderOrderList } from "@/api/order";
import { TICKET_STATUS_TYPE, ticket } from "@/model";
import clsx from "clsx";
import { getTicketTickets } from "@/api/ticket";
import { getAccountRegisteredList } from "@/api/account";
import { useMediaQuery } from "usehooks-ts";
import { DashboardOrdersTable } from "./partials/ordersTable";
import { MobileDashboardOrdersTable } from "./partials/mobileOrdersTable";
import { DashboardRegisteredTable } from "./partials/registeredTable";
import { MobileDashboardRegisteredTable } from "./partials/mobileRegisteredTable";

function Dashboard() {
  const matches = useMediaQuery("(max-width: 1280px)");

  const { data: ordersPagination, isLoading: isOrdersLoading } = useQuery(
    "dashboard-orders-list-pagination",
    () =>
      getOrderOrderList({
        params: {
          page: 1,
          page_size: 15,
        },
      })
  );

  const { data: registeredList, isLoading: isRegistersLoading } = useQuery(
    "dashboard-registered-list-pagination",
    () =>
      getAccountRegisteredList({
        params: {
          page: 1,
          page_size: 8,
        },
      })
  );

  const { data: ticketsPagination } = useQuery(
    "dashboard-tickets-transactions",
    () =>
      getTicketTickets({
        params: {
          page: 1,
          page_size: 8,
        },
      })
  );

  return (
    <div className="min-h-innerContainer flex flex-col gap-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap xl:flex-nowrap">
        <DashboardCard
          growth={11.2}
          icon={<Buy size={matches ? "small" : "medium"} />}
          title="کل سفارش‌ها"
          type="secondary"
          unit="سفارش"
          value={20}
        />
        <DashboardCard
          growth={0}
          icon={<Wallet size={matches ? "small" : "medium"} />}
          title="وجوه ورودی"
          type="success"
          unit="تومان"
          value="2450000"
        />
        <DashboardCard
          growth={-11.2}
          icon={<TwoUsers size={matches ? "small" : "medium"} />}
          title="مشتری فعال"
          type="warning"
          unit="نفر"
          value={12}
        />
        <DashboardCard
          growth={11.2}
          icon={<AddUser size={matches ? "small" : "medium"} />}
          title="درخواست ثبت نام"
          type="danger"
          unit="درخواست"
          value={16}
        />
      </div>
      {matches ? (
        <MobileDashboardOrdersTable
          orders={ordersPagination?.data.results}
          isLoading={isOrdersLoading}
        />
      ) : (
        <DashboardOrdersTable
          orders={ordersPagination?.data.results}
          isLoading={isOrdersLoading}
        />
      )}
      <div className="flex items-start gap-4 w-full flex-wrap xl:flex-nowrap">
        <div className="border border-grey-200 rounded-custom w-full xl:w-2/3">
          <div className="bg-grey-50 rounded-t-custom px-5 py-4 flex items-center justify-between">
            <h4 className="text-base font-semibold flex items-center gap-x-2">
              <Calling />
              <span>پشتیبانی</span>
            </h4>
            <Link
              to="/support"
              className="btn btn-link btn-xs btn-ghost decoration-transparent text-grey-800"
            >
              مشاهده همه
              <ArrowLeft />
            </Link>
          </div>
          {ticketsPagination?.data.results.map((item: ticket) => (
            <Link
              to="/"
              className="py-2.5 px-5 flex flex-col gap-y-2.5"
              key={item.id}
            >
              <div className="flex items-ceter justify-between">
                <span className="font-semibold text-sm">
                  {item.user.first_name} {item.user.last_name}
                </span>
                <span className="font-light text-sm text-grey-600">
                  {new Intl.DateTimeFormat("fa-IR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date(item.created_at))}
                </span>
              </div>
              <div className="flex items-ceter justify-between">
                <span
                  className={clsx(
                    "badge inline-block px-1 text-xs",
                    item.status === "new" && "bg-secondary-50 text-success-50",
                    item.status === "processing" &&
                      "bg-secondary-50 text-secondary",
                    item.status === "closed" && "badge-accent text-grey-400"
                  )}
                >
                  {TICKET_STATUS_TYPE[item.status]}
                </span>
                <span className="font-light text-xs inline-block w-5 py-0.5 rounded-full bg-warning text-center">
                  {item.new_massage}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="border border-grey-200 rounded-custom w-full">
          <div className="bg-secondary-50 rounded-t-custom px-5 py-4 flex items-center justify-between">
            <h4 className="text-base font-semibold">درخواست‌های ثبت نام</h4>
            <Link
              to="/orders"
              className="btn btn-link btn-xs btn-ghost decoration-transparent text-grey-800"
            >
              مشاهده همه
              <ArrowLeft />
            </Link>
          </div>
          {matches ? (
            <MobileDashboardRegisteredTable
              registers={registeredList?.data.results}
              isLoading={isRegistersLoading}
            />
          ) : (
            <DashboardRegisteredTable
              registers={registeredList?.data.results}
              isLoading={isRegistersLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
