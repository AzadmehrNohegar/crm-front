import { ORDER_TYPES, PAYMENT_TYPE, order } from "@/model";
import { Show } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { Link, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { Fragment } from "react";

interface IMobileOrdersTableProps {
  isLoading: boolean;
  orders?: order[];
}

function MobileOrdersTable({ isLoading, orders }: IMobileOrdersTableProps) {
  const [searchParams] = useSearchParams();

  const parsePaymentType = (order: order) => {
    if (order.payment.offline_transaction)
      return PAYMENT_TYPE["offline_transaction"];
    if (order.payment.online_transaction)
      return PAYMENT_TYPE["online_transaction"];
    return PAYMENT_TYPE["wallet_transaction"];
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col py-1.5 divide-y">
        {isLoading ? (
          <Fragment>
            <div className="flex-col p-3.5 gap-y-2">
              <Skeleton
                count={2}
                containerClassName="w-full flex items-center justify-between gap-x-2 my-2"
                width="100%"
                height={24}
              />
              <Skeleton
                count={2}
                containerClassName="w-full flex items-center justify-between gap-x-2 my-2"
                width="100%"
                height={24}
              />
              <Skeleton
                count={2}
                containerClassName="w-full flex items-center justify-between gap-x-2 my-2"
                width="100%"
                height={24}
              />
              <Skeleton
                count={2}
                containerClassName="w-full flex items-center justify-between gap-x-2 my-2"
                width="100%"
                height={24}
              />
              <Skeleton
                count={2}
                containerClassName="w-full flex items-center justify-between gap-x-2 my-2"
                width="100%"
                height={24}
              />
              <Skeleton
                count={2}
                containerClassName="w-full flex items-center justify-between gap-x-2 my-2"
                width="100%"
                height={24}
              />
            </div>
            <div className="flex-col p-3.5 gap-y-2">
              <Skeleton
                count={2}
                containerClassName="w-full flex items-center justify-between gap-x-2 my-2"
                width="100%"
                height={24}
              />
              <Skeleton
                count={2}
                containerClassName="w-full flex items-center justify-between gap-x-2 my-2"
                width="100%"
                height={24}
              />
              <Skeleton
                count={2}
                containerClassName="w-full flex items-center justify-between gap-x-2 my-2"
                width="100%"
                height={24}
              />
              <Skeleton
                count={2}
                containerClassName="w-full flex items-center justify-between gap-x-2 my-2"
                width="100%"
                height={24}
              />
              <Skeleton
                count={2}
                containerClassName="w-full flex items-center justify-between gap-x-2 my-2"
                width="100%"
                height={24}
              />
              <Skeleton
                count={2}
                containerClassName="w-full flex items-center justify-between gap-x-2 my-2"
                width="100%"
                height={24}
              />
            </div>
          </Fragment>
        ) : (
          orders?.map((item, index: number) => (
            <div className="flex-col p-3.5 text-sm" key={item.id}>
              <strong className="flex items-center justify-between mb-4">
                <strong className="inline-flex items-center">
                  <span className="inline-block p-1.5 bg-grey-100 w-7 text-center text-grey-600 rounded-lg me-2">
                    {((+searchParams.get("page")! || 1) - 1) *
                      (+searchParams.get("page_size")! || 10) +
                      index +
                      1}
                  </span>
                </strong>

                <Link
                  to={`./${item.id}`}
                  className="btn btn-ghost btn-sm text-grey-800 px-0"
                >
                  <Show size="small" />
                </Link>
              </strong>
              <ul className="flex flex-col gap-y-4">
                <li className="flex items-center justify-between">
                  <span className="text-sm font-semibold">شماره سفارش‌</span>
                  <span className="font-light text-grey-600">{item.id}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm font-semibold">نام کاربر</span>
                  <span className="font-light text-grey-600">
                    {item.customer?.first_name} {item.customer?.last_name}
                  </span>
                </li>

                <li className="flex items-center justify-between">
                  <span className="text-sm font-semibold">نوع پرداخت</span>
                  <span className="font-light text-grey-600">
                    {parsePaymentType(item)}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm font-semibold">مبلغ</span>
                  <span className="font-light text-grey-600">
                    {Number(item.payment?.amount).toLocaleString()} تومان
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm font-semibold">زمان تراکنش</span>
                  <span className="font-light text-grey-600">
                    {new Intl.DateTimeFormat("fa-IR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date(item.created_date))}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm font-semibold">وضعیت</span>
                  <span
                    className={clsx(
                      "font-light",
                      item.status === "completed" && " text-success",
                      item.status === "canceled" && " text-danger"
                    )}
                  >
                    {ORDER_TYPES[item.status]}
                  </span>
                </li>
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export { MobileOrdersTable };
