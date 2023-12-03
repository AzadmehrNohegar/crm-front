import { ORDER_TYPES, PAYMENT_TYPE, order } from "@/model";
import clsx from "clsx";
import { ArrowLeft, Show } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

interface IDashboardOrdersTable {
  orders: order[];
  isLoading: boolean;
}

function DashboardOrdersTable({ isLoading, orders }: IDashboardOrdersTable) {
  const parsePaymentType = (order: order) => {
    if (!order.payment) return "پرداخت نشده";
    if (order.payment?.offline_transaction)
      return PAYMENT_TYPE["offline_transaction"];
    if (order.payment?.online_transaction)
      return PAYMENT_TYPE["online_transaction"];
    return PAYMENT_TYPE["wallet_transaction"];
  };

  if (isLoading) return <Skeleton height={600} />;

  return (
    <div className="border border-grey-200 rounded-custom">
      <div className="bg-secondary-50 rounded-t-custom px-5 py-4 flex items-center justify-between">
        <h4 className="text-sm xl:text-base font-semibold">لیست سفارش</h4>
        <Link
          to="/orders"
          className="btn btn-link btn-xs btn-ghost decoration-transparent text-grey-800 text-sm xl:text-base"
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
            {orders?.map((item: order, index: number) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { DashboardOrdersTable };
