import { getOrderOrderListById } from "@/api/order";
import { ORDER_TYPES, PAYMENT_TYPE, order } from "@/model";
import { CollapseWrapper } from "@/shared/collapseWrapper";
import clsx from "clsx";
import { Fragment } from "react";
import { Chart, ChevronLeft } from "react-iconly";
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
    if (order.payment.offline_transaction)
      return PAYMENT_TYPE["offline_transaction"];
    if (order.payment.online_transaction)
      return PAYMENT_TYPE["online_transaction"];
    return PAYMENT_TYPE["wallet_transaction"];
  };

  if (isLoading) return <>loading...</>;

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
      <CollapseWrapper title="جزئیات سفارش" className="flex flex-col gap-y-4">
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
    </Fragment>
  );
}

export default OrderDetails;
