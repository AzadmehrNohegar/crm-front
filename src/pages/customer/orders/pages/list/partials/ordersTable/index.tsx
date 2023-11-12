import { ORDER_TYPES, PAYMENT_TYPE, order } from "@/model";
import { Show, Swap } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { Link, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { Fragment } from "react";

interface IOrdersTableProps {
  isLoading: boolean;
  orders?: order[];
}

function OrdersTable({ isLoading, orders }: IOrdersTableProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const parsePaymentType = (order: order) => {
    if (order.payment.offline_transaction)
      return PAYMENT_TYPE["offline_transaction"];
    if (order.payment.online_transaction)
      return PAYMENT_TYPE["online_transaction"];
    return PAYMENT_TYPE["wallet_transaction"];
  };

  const handleSort = (val: string) => {
    if (searchParams.get("ordering") === val) {
      searchParams.set("ordering", `-${val}`);
      setSearchParams(searchParams);
    } else {
      searchParams.set("ordering", val);
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-auto text-start">
        <thead className="bg-grey-50">
          <tr>
            <th align="right">
              <span className="text-2xl font-light">#</span>
            </th>
            <th align="right">
              <span className="inline-flex items-center text-sm text-grey-800">
                شماره سفارش‌
                <button
                  className="btn btn-ghost btn-square btn-sm"
                  value="id"
                  onClick={(e) => handleSort(e.currentTarget.value)}
                >
                  <Swap />
                </button>
              </span>
            </th>
            <th align="right">
              <span className="text-sm text-grey-800">عناوین محصول</span>
            </th>
            <th align="right">
              <span className="text-sm text-grey-800">نوع پرداخت‌</span>
            </th>
            <th align="right">
              <span className="inline-flex items-center text-sm text-grey-800">
                مبلغ
                <button
                  className="btn btn-ghost btn-square btn-sm"
                  value="amount"
                  onClick={(e) => handleSort(e.currentTarget.value)}
                >
                  <Swap />
                </button>
              </span>
            </th>
            <th align="right">
              <span className="inline-flex items-center text-sm text-grey-800">
                زمان تراکنش
                <button
                  className="btn btn-ghost btn-square btn-sm"
                  value="created_date"
                  onClick={(e) => handleSort(e.currentTarget.value)}
                >
                  <Swap />
                </button>
              </span>
            </th>
            <th align="right">
              <span className="inline-flex items-center text-sm text-grey-800">
                وضعیت
                <button
                  className="btn btn-ghost btn-square btn-sm"
                  value="status"
                  onClick={(e) => handleSort(e.currentTarget.value)}
                >
                  <Swap />
                </button>
              </span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Fragment>
              <tr>
                <td>
                  <Skeleton height={51} />
                </td>
                <td>
                  <Skeleton height={51} />
                </td>
                <td>
                  <Skeleton height={51} />
                </td>
                <td>
                  <Skeleton height={51} />
                </td>
                <td>
                  <Skeleton height={51} />
                </td>
                <td>
                  <Skeleton height={51} />
                </td>
                <td>
                  <Skeleton height={51} width={44} />
                </td>
                <td>
                  <Skeleton height={51} width={44} />
                </td>
              </tr>
              <tr>
                <td>
                  <Skeleton height={51} />
                </td>
                <td>
                  <Skeleton height={51} />
                </td>
                <td>
                  <Skeleton height={51} />
                </td>
                <td>
                  <Skeleton height={51} />
                </td>
                <td>
                  <Skeleton height={51} />
                </td>
                <td>
                  <Skeleton height={51} />
                </td>
                <td>
                  <Skeleton height={51} width={44} />
                </td>
                <td>
                  <Skeleton height={51} width={44} />
                </td>
              </tr>
            </Fragment>
          ) : null}
          {orders?.map((item, index: number) => (
            <tr key={item.id}>
              <td>
                {((+searchParams.get("page")! || 1) - 1) *
                  (+searchParams.get("page_size")! || 10) +
                  index +
                  1}
              </td>
              <td>{item.id}</td>
              <td>
                {item.order_item
                  .slice(0, 2)
                  .map((entry) => entry.name)
                  .map((str) => (
                    <Fragment>
                      {str}
                      <span className="last-of-type:hidden">/</span>
                    </Fragment>
                  ))}
              </td>
              <td>{parsePaymentType(item)}</td>
              <td>{item.payment.amount.toLocaleString()} تومان</td>
              <td>
                {new Intl.DateTimeFormat("fa-IR", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date(item.created_date))}
              </td>
              <td>
                <span
                  className={clsx(
                    "font-light text-sm",
                    item.status === "completed" && "text-success",
                    item.status === "pending" && "text-grey-600",
                    item.status === "canceled" && "text-danger"
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
  );
}

export { OrdersTable };
