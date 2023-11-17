import { TICKET_STATUS_TYPE, ticket } from "@/model";
import { Show, Swap } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { Link, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { Fragment } from "react";

interface ITicketsTableProps {
  isLoading: boolean;
  tickets?: ticket[];
}

function TicketsTable({ isLoading, tickets }: ITicketsTableProps) {
  const [searchParams, setSearchParams] = useSearchParams();

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
        <thead className="bg-secondary-50">
          <tr>
            <th align="right">
              <span className="text-2xl font-light">#</span>
            </th>
            <th align="right">
              <span className="inline-flex items-center text-sm text-grey-800">
                عنوان
                <button
                  className="btn btn-ghost btn-square btn-sm"
                  value="title"
                  onClick={(e) => handleSort(e.currentTarget.value)}
                >
                  <Swap />
                </button>
              </span>
            </th>
            <th align="right">
              <span className="inline-flex items-center text-sm text-grey-800">
                شماره تیکت
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
              <span className="inline-flex items-center text-sm text-grey-800">
                زمان
                <button
                  className="btn btn-ghost btn-square btn-sm"
                  value="created_at"
                  onClick={(e) => handleSort(e.currentTarget.value)}
                >
                  <Swap />
                </button>
              </span>
            </th>
            <th align="right">
              <span className="text-sm text-grey-800">پیام جدید</span>
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
                <td className="w-1/2">
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
              </tr>
              <tr>
                <td>
                  <Skeleton height={51} />
                </td>
                <td className="w-1/2">
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
              </tr>
            </Fragment>
          ) : null}
          {tickets?.map((item, index: number) => (
            <tr key={item.id}>
              <td>
                {((+searchParams.get("page")! || 1) - 1) *
                  (+searchParams.get("page_size")! || 10) +
                  index +
                  1}
              </td>
              <td className="w-1/2">{item.title}</td>
              <td>{item.id}</td>
              <td>
                <span className="inline-block min-w-max">
                  {new Intl.DateTimeFormat("fa-IR", {
                    timeStyle: "short",
                    dateStyle: "short",
                  }).format(new Date(item.created_at))}
                </span>
              </td>
              <td>
                <span
                  className={clsx(
                    "badge inline-block ms-auto px-1 text-sm",
                    item.new_massage > 0 && "badge-warning text-grey-800",
                    item.new_massage === 0 && "badge-accent text-grey-400"
                  )}
                >
                  {item.new_massage}
                </span>
              </td>
              <td>
                <span
                  className={clsx(
                    "badge inline-block px-1 text-xs",
                    item.status === "new" && "badge-success text-white",
                    item.status === "processing" &&
                      "bg-secondary-50 text-secondary",
                    item.status === "closed" && "badge-accent text-grey-400"
                  )}
                >
                  {TICKET_STATUS_TYPE[item.status]}
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

export { TicketsTable };
