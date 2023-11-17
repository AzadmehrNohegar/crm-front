import { TICKET_STATUS_TYPE, ticket } from "@/model";
import { Show } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { Link, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { Fragment } from "react";

interface IMobileTicketsTableProps {
  isLoading: boolean;
  tickets?: ticket[];
}

function MobileTicketsTable({ isLoading, tickets }: IMobileTicketsTableProps) {
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
          tickets?.map((item, index: number) => (
            <div className="flex-col p-3.5 text-sm" key={item.id}>
              <strong className="flex items-center justify-between mb-4">
                <span className="inline-block p-1.5 bg-grey-100 w-7 text-center text-grey-600 rounded-lg">
                  {((+searchParams.get("page")! || 1) - 1) *
                    (+searchParams.get("page_size")! || 10) +
                    index +
                    1}
                </span>
                <Link
                  to={`./${item.id}`}
                  className="btn btn-ghost btn-sm text-grey-800 px-0"
                >
                  <Show size="small" />
                </Link>
              </strong>
              <ul className="flex flex-col gap-y-4">
                <li className="flex items-center justify-between">
                  <span className="text-sm font-semibold">عنوان</span>
                  <span className="font-light text-grey-600">{item.title}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm font-semibold">شماره تیکت‌</span>
                  <span className="font-light text-grey-600">{item.id}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm font-semibold">زمان</span>
                  <span className="font-light text-grey-600">
                    {new Intl.DateTimeFormat("fa-IR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date(item.created_at))}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm font-semibold">پیام جدید</span>
                  <span
                    className={clsx(
                      "badge font-light inline-block ms-auto px-1 text-sm",
                      item.new_massage > 0 && "badge-warning text-grey-800",
                      item.new_massage === 0 && "badge-accent text-grey-400"
                    )}
                  >
                    {item.new_massage}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm font-semibold">وضعیت</span>
                  <span
                    className={clsx(
                      "badge font-light inline-block px-1 text-xs",
                      item.status === "new" && "badge-success text-white",
                      item.status === "processing" &&
                        "badge-secondary text-secondary",
                      item.status === "closed" && "badge-accent text-grey-400"
                    )}
                  >
                    {TICKET_STATUS_TYPE[item.status]}
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

export { MobileTicketsTable };
