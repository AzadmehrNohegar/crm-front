import {
  AddUser,
  Buy,
  Calling,
  ArrowLeft,
  Show,
  Swap,
  TwoUsers,
  Wallet,
} from "react-iconly";
import { DashboardCard } from "./partials/dashboardCard";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getOrderOrderList } from "@/api/order";
import {
  ORDER_TYPES,
  PAYMENT_TYPE,
  TICKET_STATUS_TYPE,
  USER_TYPES,
  account,
  order,
  ticket,
} from "@/model";
import clsx from "clsx";
import { getTicketTickets } from "@/api/ticket";
import { getAccountRegisteredList } from "@/api/account";

function Dashboard() {
  const { data: ordersPagination } = useQuery(
    "dashboard-orders-list-pagination",
    () =>
      getOrderOrderList({
        params: {
          page: 1,
          page_size: 15,
        },
      })
  );

  const { data: registeredList } = useQuery(
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

  const parsePaymentType = (order: order) => {
    if (!order.payment) return "پرداخت نشده";
    if (order.payment.offline_transaction)
      return PAYMENT_TYPE["offline_transaction"];
    if (order.payment.online_transaction)
      return PAYMENT_TYPE["online_transaction"];
    return PAYMENT_TYPE["wallet_transaction"];
  };

  return (
    <div className="min-h-innerContainer flex flex-col gap-y-5">
      <div className="flex items-center justify-between gap-x-4">
        <DashboardCard
          growth={11.2}
          icon={<Buy />}
          title="کل سفارش‌ها"
          type="secondary"
          unit="سفارش"
          value={20}
        />
        <DashboardCard
          growth={0}
          icon={<Wallet />}
          title="وجوه ورودی"
          type="success"
          unit="تومان"
          value="2450000"
        />
        <DashboardCard
          growth={-11.2}
          icon={<TwoUsers />}
          title="مشتری فعال"
          type="warning"
          unit="نفر"
          value={12}
        />
        <DashboardCard
          growth={11.2}
          icon={<AddUser />}
          title="درخواست ثبت نام"
          type="danger"
          unit="درخواست"
          value={16}
        />
      </div>
      <div className="border border-grey-200 rounded-custom">
        <div className="bg-secondary-50 rounded-t-custom px-5 py-4 flex items-center justify-between">
          <h4 className="text-base font-semibold">لیست سفارش</h4>
          <Link
            to="/orders"
            className="btn btn-link btn-sm btn-ghost decoration-transparent text-grey-800"
          >
            مشاهده همه
            <ArrowLeft />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-auto text-start">
            <thead className="bg-secondary-50">
              <tr>
                <th align="right">
                  <span className="text-2xl font-light">#</span>
                </th>
                <th align="right">
                  <span className="inline-flex items-center text-sm text-grey-800">
                    شماره سفارش‌
                  </span>
                </th>
                <th align="right">
                  <span className="inline-flex items-center text-sm text-grey-800">
                    نام کاربر
                  </span>
                </th>

                <th align="right">
                  <span className="inline-flex items-center text-sm text-grey-800">
                    نوع پرداخت
                  </span>
                </th>
                <th align="right">
                  <span className="inline-flex items-center text-sm text-grey-800">
                    مبلغ
                  </span>
                </th>
                <th align="right">
                  <span className="inline-flex items-center text-sm text-grey-800">
                    زمان خرید
                  </span>
                </th>
                <th align="right">
                  <span className="inline-flex items-center text-sm text-grey-800">
                    وضعیت
                  </span>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ordersPagination?.data.results.map(
                (item: order, index: number) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>
                      {item.customer?.first_name} {item.customer?.last_name}
                    </td>
                    <td>{parsePaymentType(item)}</td>
                    <td>
                      <span className="inline-block min-w-max">
                        {item.payment
                          ? `${item.payment?.amount.toLocaleString()} تومان`
                          : "-"}{" "}
                      </span>
                    </td>
                    <td>
                      {new Intl.DateTimeFormat("fa-IR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      }).format(new Date(item.created_date))}
                    </td>
                    <td>
                      <span
                        className={clsx(
                          "badge font-light text-sm inline-block min-w-max",
                          item.status === "completed" &&
                            "bg-success-50 border-transparent text-success",
                          item.status === "pending" &&
                            "bg-grey-50 border-transparent text-grey",
                          item.status === "need_payment" &&
                            "bg-warning-50 border-transparent text-warning",
                          item.status === "canceled" &&
                            "bg-danger-50 border-transparent text-danger"
                        )}
                      >
                        {ORDER_TYPES[item.status]}
                      </span>
                    </td>
                    <td align="left">
                      <Link
                        to={`./${item.id}`}
                        className="btn btn-ghost text-grey-800"
                      >
                        <Show />
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-start gap-x-4 w-full">
        <div className="border border-grey-200 rounded-custom w-2/3">
          <div className="bg-grey-50 rounded-t-custom px-5 py-4 flex items-center justify-between">
            <h4 className="text-base font-semibold flex items-center gap-x-2">
              <Calling />
              <span>پشتیبانی</span>
            </h4>
            <Link
              to="/support"
              className="btn btn-link btn-sm btn-ghost decoration-transparent text-grey-800"
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
              className="btn btn-link btn-sm btn-ghost decoration-transparent text-grey-800"
            >
              مشاهده همه
              <ArrowLeft />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-auto text-start">
              <thead className="bg-secondary-50">
                <tr>
                  <th align="right">
                    <span className="inline-flex items-center text-sm text-grey-800">
                      نام کاربر
                      <button className="btn btn-ghost btn-square btn-sm">
                        <Swap />
                      </button>
                    </span>
                  </th>

                  <th align="right">
                    <span className="inline-flex items-center text-sm text-grey-800">
                      نوع کاربر
                      <button className="btn btn-ghost btn-square btn-sm">
                        <Swap />
                      </button>
                    </span>
                  </th>
                  <th align="right">
                    <span className="inline-flex items-center text-sm text-grey-800">
                      زمان درخواست
                      <button className="btn btn-ghost btn-square btn-sm">
                        <Swap />
                      </button>
                    </span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {registeredList?.data.results.map((item: account) => (
                  <tr key={item.id}>
                    <td>
                      {item.first_name} {item.last_name}
                    </td>
                    <td>
                      <span
                        className={clsx(
                          "badge",
                          item.customer?.contract_type === "REAL" &&
                            "bg-success-50 text-success-700",
                          item.customer?.contract_type === "JURIDICAL" &&
                            "bg-warning-50 text-warning"
                        )}
                      >
                        {USER_TYPES[item.customer?.contract_type]}
                      </span>
                    </td>
                    <td>
                      {new Intl.DateTimeFormat("fa-IR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      }).format(new Date(item.created_at))}
                    </td>
                    <td align="left">
                      <Link
                        to={`/users/${item.id}`}
                        className="btn btn-ghost text-grey-800"
                      >
                        <Show />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
