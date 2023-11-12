import { getOrderOrderListById } from "@/api/order";
import {
  MEASURE_TYPES,
  ORDER_TYPES,
  PAYMENT_TYPE,
  order,
  order_item,
  product,
} from "@/model";
import { CollapseWrapper } from "@/shared/collapseWrapper";
import clsx from "clsx";
import { Fragment } from "react";
import { Chart, ChevronLeft } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

function OrderDetails() {
  const { order_id } = useParams();

  const { data: orderDetails, isLoading } = useQuery(`order-${order_id}`, () =>
    getOrderOrderListById({
      id: order_id,
    })
  );

  const parsePaymentType = (order: order) => {
    if (order?.payment.offline_transaction)
      return PAYMENT_TYPE["offline_transaction"];
    if (order?.payment.online_transaction)
      return PAYMENT_TYPE["online_transaction"];
    return PAYMENT_TYPE["wallet_transaction"];
  };

  if (isLoading)
    return (
      <Fragment>
        <Skeleton height={56} />
        <Skeleton height={405} />
        <Skeleton height={341} />
      </Fragment>
    );

  return (
    <Fragment>
      <ul className="flex items-center gap-x-2 bg-grey-50 w-fit px-4 py-1 rounded-lg">
        <li className="inline-flex items-center">
          <Link
            to=".."
            className="inline-flex btn btn-link decoration-transparent items-center px-0 text-grey-500 gap-x-2"
          >
            <Chart />
            سفارشات
            <ChevronLeft />
          </Link>
        </li>
        <li className="inline-flex items-center">
          <span className="text-grey-800 font-semibold">{order_id}</span>
        </li>
      </ul>
      <CollapseWrapper title="جزئیات سفارش" className="flex flex-col">
        <div className="flex items-center justify-between">
          <h5 className="text-base font-semibold">وضعیت سفارش</h5>
          <span
            className={clsx(
              "text-sm px-3 py-1 rounded-lg",
              orderDetails?.data.status === "completed" &&
                "text-success bg-success-50",
              orderDetails?.data.status === "pending" && "text-grey bg-grey-50",
              orderDetails?.data.status === "canceled" &&
                "text-danger bg-danger-50"
            )}
          >
            {ORDER_TYPES[orderDetails?.data.status]}
          </span>
        </div>
        <ul className="flex flex-col divide-y px-5 py-3 border border-grey-200 rounded-custom">
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">شماره سفارش</span>
            <strong>{orderDetails?.data.id || "-"}</strong>
          </li>
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">مبلغ کل سفارش</span>
            <strong>
              {Number(orderDetails?.data.payment?.amount).toLocaleString() ||
                "-"}
            </strong>
          </li>
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">نوع پرداخت</span>
            <strong>{parsePaymentType(orderDetails?.data as order)}</strong>
          </li>
          {orderDetails?.data.payment.online_transaction ? (
            <li className="flex items-center justify-between py-4 text-sm">
              <span className="text-grey-600 font-light">نام درگاه</span>
              <strong>زرین‌پال</strong>
            </li>
          ) : null}
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">زمان تراکنش</span>
            <strong>
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(orderDetails?.data.created_date))}
            </strong>
          </li>
        </ul>
      </CollapseWrapper>
      <CollapseWrapper title="سبد خرید شما" className="flex flex-col divide-y">
        {orderDetails?.data.order_item.map(
          (item: order_item, index: number) => (
            <div className="flex w-full gap-x-4 py-5 items-stretch">
              <span className="inline-flex h-auto items-center justify-center rounded-lg bg-grey-100 text-grey-600 text-center min-w-[30px]">
                {index + 1}
              </span>
              <img
                src={(item.product as product).image}
                width={60}
                height={60}
                alt="product thumbnail"
              />
              <div className="w-full flex flex-col justify-between">
                <span className="text-sm font-bold">
                  {(item.product as product).name}
                </span>
                <span className="flex w-1/2 items-center justify-between">
                  <span className="badge badge-accent text-xs">
                    {(item.product as product).category.name}
                  </span>
                  <strong className="text-sm">
                    {item.product_price.weight || ""}{" "}
                    <span className="text-xs text-grey-500 font-light">
                      {MEASURE_TYPES[item.product_price.measure_type]}
                    </span>
                  </strong>
                </span>
              </div>
              <div className="flex flex-col items-end gap-y-2 justify-between">
                <strong className="text-sm inline-flex items-center gap-x-1">
                  <span
                    className={clsx(
                      item?.discount_amount &&
                        "text-danger relative before:absolute before:w-full before:h-px before:bg-danger before:inset-y-1/2 before:-rotate-[15deg]"
                    )}
                  >
                    {item?.unit_price.toLocaleString()}{" "}
                  </span>
                  {"  "}
                  {item?.discount_amount === 0
                    ? ""
                    : item?.discount_amount?.toLocaleString() || ""}{" "}
                  <span className="text-xs font-light text-grey-500">
                    تومان
                  </span>
                </strong>
                <strong className="text-sm font-semibold">
                  {item.quantity}{" "}
                  <span className="text-grey-500 font-light text-xs">عدد</span>
                </strong>
              </div>
            </div>
          )
        )}
      </CollapseWrapper>
    </Fragment>
  );
}

export default OrderDetails;
