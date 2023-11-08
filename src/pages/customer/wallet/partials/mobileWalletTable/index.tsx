import {
  STATUS_TYPE,
  WALLET_TRANSACTION_TYPE,
  wallet_transaction,
} from "@/model";
import clsx from "clsx";
import { Fragment } from "react";
import Skeleton from "react-loading-skeleton";
import { useSearchParams } from "react-router-dom";

interface IMobileWalletTableProps {
  wallet_transactions?: wallet_transaction[];
  isLoading: boolean;
}

function MobileWalletTable({
  isLoading,
  wallet_transactions,
}: IMobileWalletTableProps) {
  const [searchParams] = useSearchParams();

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
            </div>
          </Fragment>
        ) : (
          wallet_transactions?.map((item, index: number) => (
            <div className="flex-col p-3.5 text-sm">
              <strong className="inline-block mb-4">
                <span className="inline-block p-1.5 bg-grey-100 w-7 text-center text-grey-600 rounded-lg">
                  {((+searchParams.get("page")! || 1) - 1) *
                    (+searchParams.get("page_size")! || 10) +
                    index +
                    1}
                </span>{" "}
                {item.description}
              </strong>
              <ul className="flex flex-col gap-y-4">
                <li className="flex items-center justify-between">
                  <span className="text-sm font-semibold">شماره تراکنش</span>
                  <span className="font-light text-grey-600">{item.id}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm font-semibold">نوع</span>
                  <span
                    className={
                      item.type === "deposit"
                        ? "font-light text-success-400"
                        : "font-light text-danger"
                    }
                  >
                    {WALLET_TRANSACTION_TYPE[item.type]}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm font-semibold">مبلغ</span>
                  <span className="font-light text-grey-600">
                    {Number(item.amount).toLocaleString()} تومان
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
                      item.status === "success" && "text-success",
                      item.status === "pending" && "text-grey-600",
                      item.status === "failed" && "text-danger"
                    )}
                  >
                    {STATUS_TYPE[item.status]}
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

export { MobileWalletTable };
