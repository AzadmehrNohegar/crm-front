import { getOrderOrderListById } from "@/api/order";
import {
  CONTRACT_TYPES,
  MEASURE_TYPES,
  ORDER_TYPES,
  PAYMENT_TYPE,
  STATUS_TYPE,
  inventory_item,
  order,
  order_item,
  product,
} from "@/model";
import { CollapseWrapper } from "@/shared/collapseWrapper";
import clsx from "clsx";
import { Fragment, useState } from "react";
import {
  ChevronLeft,
  Download,
  Edit,
  Paper,
  Upload,
  Wallet,
} from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { OrdersDetailsChangeStatusDialog } from "./partials/ordersDetailsChangeStatusDialog";
import { OrdersDetailsPaymentDialog } from "./partials/odersDetailsPaymentDialog";

function OrdersDetails() {
  const { order_id } = useParams();

  const [
    isOdersDetailsChangeStatusDialogOpen,
    setIsOdersDetailsChangeStatusDialogOpen,
  ] = useState(false);

  const [isOrderDetailsPaymentDialogOpen, setIsOrderDetailsPaymentDialogOpen] =
    useState(false);

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

  if (isLoading)
    return (
      <Fragment>
        <Skeleton height={56} />
        <Skeleton height={432} />
        <Skeleton height={325} />
      </Fragment>
    );

  return (
    <Fragment>
      <div className="flex items-center gap-x-3">
        <ul className="flex items-center gap-x-2 bg-grey-50 w-fit px-4 py-1 rounded-lg me-auto">
          <li className="inline-flex items-center">
            <Link
              to=".."
              className="inline-flex btn btn-link decoration-transparent items-center px-0 text-grey-500 gap-x-2"
            >
              <Paper />
              لیست سفارشات
              <ChevronLeft />
            </Link>
          </li>
          <li className="inline-flex items-center">
            <span className="text-grey-800 font-semibold">
              {orderDetails?.data.customer?.first_name}{" "}
              {orderDetails?.data.customer?.last_name}
            </span>
          </li>
        </ul>
        {!orderDetails?.data.payment ? (
          <button
            className="btn btn-ghost text-grey-800"
            onClick={() => setIsOrderDetailsPaymentDialogOpen(true)}
          >
            <Wallet />
            پرداخت هزینه
          </button>
        ) : null}
        {["processing"].includes(orderDetails?.data.status as string) ? (
          <Link
            to={`../${order_id}/supply`}
            className="btn btn-link text-grey-800 decoration-transparent"
          >
            <Upload />
            تامین کالا
          </Link>
        ) : null}
        <button
          className="btn btn-secondary"
          onClick={() => setIsOdersDetailsChangeStatusDialogOpen(true)}
        >
          <Edit />
          تغییر وضعیت سفارش
        </button>
      </div>
      <CollapseWrapper title="جزئیات محصول">
        <div className="flex items-center justify-between mb-4">
          <h5 className="font-bold">وضعیت سفارش</h5>
          <span
            className={clsx(
              "badge font-light text-sm inline-block min-w-max",
              orderDetails?.data.status === "completed" &&
                "bg-success-50 border-transparent text-success",
              orderDetails?.data.status === "pending" &&
                "bg-grey-50 border-transparent text-grey",
              orderDetails?.data.status === "need_payment" &&
                "bg-warning-50 border-transparent text-warning",
              orderDetails?.data.status === "canceled" &&
                "bg-danger-50 border-transparent text-danger"
            )}
          >
            {ORDER_TYPES[orderDetails?.data.status]}
          </span>
        </div>
        <ul className="flex flex-col divide-y">
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">نام کاربر</span>
            <strong>
              {orderDetails?.data.customer?.first_name}{" "}
              {orderDetails?.data.customer?.last_name}
            </strong>
          </li>
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">نوع کاربر</span>
            <strong>
              {CONTRACT_TYPES[orderDetails?.data.customer?.contract_type]}
            </strong>
          </li>
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">شماره سفارش</span>
            <strong>{orderDetails?.data.id}</strong>
          </li>
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">زمان ثبت سفارش</span>
            <strong>
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(orderDetails?.data.created_date))}
            </strong>
          </li>
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">قیمت محصول</span>
            <span className="text-xs text-grey-500">
              <strong className="text-base font-bold text-grey-800">
                {Number(orderDetails?.data.amount).toLocaleString()}
              </strong>{" "}
              تومان
            </span>
          </li>
        </ul>
      </CollapseWrapper>
      {orderDetails?.data.payment ? (
        <CollapseWrapper title="جزئیات پرداخت">
          <ul className="flex flex-col divide-y">
            <li className="flex items-center justify-between py-4 text-sm">
              <span className="text-grey-600 font-light">زمان تراکنش</span>
              <strong>
                {new Intl.DateTimeFormat("fa-IR", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date(orderDetails?.data.payment.created_date))}
              </strong>
            </li>
            <li className="flex items-center justify-between py-4 text-sm">
              <span className="text-grey-600 font-light">نوع پرداخت</span>
              <strong>{parsePaymentType(orderDetails.data)}</strong>
            </li>
            {orderDetails?.data.payment.offline_transaction ? (
              <li className="flex items-center justify-between py-4 text-sm">
                <span className="text-grey-600 font-light">فایل</span>
                <a
                  href={orderDetails?.data.payment.offline_transaction.file}
                  download
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex gap-x-2 justify-between items-center"
                >
                  <span className="text-sm text-grey-600 font-light">
                    فایل ضمیمه شده
                  </span>
                  <Download />
                </a>
              </li>
            ) : null}
            <li className="flex items-center justify-between py-4 text-sm">
              <span className="text-grey-600 font-light">وضعیت</span>
              <strong
                className={clsx(
                  orderDetails.data.payment.status === "success" &&
                    "badge bg-success-50 text-success",
                  orderDetails.data.payment.status === "pending" &&
                    "badge bg-secondary-50 text-secondary",
                  orderDetails.data.payment.status === "failed" &&
                    "badge bg-danger-50 text-danger"
                )}
              >
                {STATUS_TYPE[orderDetails.data.payment.status]}
              </strong>
            </li>
          </ul>
        </CollapseWrapper>
      ) : null}
      <CollapseWrapper
        title="سبد خرید کاربر"
        className="flex flex-col divide-y"
      >
        {orderDetails?.data.order_item.map(
          (item: order_item, index: number) => (
            <div
              className="flex w-full gap-x-4 py-5 items-stretch"
              key={item.id}
            >
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
      {orderDetails?.data.inventories ? (
        <CollapseWrapper title="جزئیات قیمت محصول" className="flex flex-col">
          <div className="overflow-x-auto">
            <table className="table table-auto text-start w-full border-separate border-spacing-2">
              <thead>
                <tr className="text-sm text-grey-800 font-semibold">
                  <th
                    className="text-grey-800 bg-secondary-50 rounded-lg"
                    align="center"
                  >
                    #
                  </th>
                  <th
                    className="text-grey-800 bg-secondary-50 rounded-lg w-1/3"
                    align="right"
                  >
                    عنوان محصول
                  </th>
                  <th
                    className="text-grey-800 bg-secondary-50 rounded-lg w-1/3"
                    align="right"
                  >
                    انبار
                  </th>
                  <th
                    className="text-grey-800 bg-secondary-50 rounded-lg w-1/3"
                    align="right"
                  >
                    مقدار
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDetails?.data.inventories.inventory_items.map(
                  (item: inventory_item, index: number) => (
                    <tr key={index}>
                      <td className="rounded-lg border border-grey-200 bg-grey-100 text-center">
                        {index + 1}
                      </td>
                      <td className="rounded-lg border border-grey-200 bg-grey-100 w-1/3">
                        <span className="inline-flex items-center w-full justify-between">
                          {item.order_item?.name}
                        </span>
                      </td>
                      <td className="rounded-lg border border-grey-200 bg-grey-100 w-1/3">
                        <span className="inline-flex items-center w-full justify-between">
                          {item.warehouse?.name}
                        </span>
                      </td>
                      <td className="rounded-lg border border-grey-200 bg-grey-100 w-1/3">
                        <span className="inline-flex items-center w-full justify-between">
                          {item.count} گرم
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </CollapseWrapper>
      ) : null}
      <OrdersDetailsChangeStatusDialog
        isOpen={isOdersDetailsChangeStatusDialogOpen}
        closeModal={() => setIsOdersDetailsChangeStatusDialogOpen(false)}
      />
      <OrdersDetailsPaymentDialog
        isOpen={isOrderDetailsPaymentDialogOpen}
        closeModal={() => setIsOrderDetailsPaymentDialogOpen(false)}
      />
    </Fragment>
  );
}

export default OrdersDetails;
