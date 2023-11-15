import { USER_TYPES, notification } from "@/model";
import clsx from "clsx";
import { Show, Swap } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { Link, useSearchParams } from "react-router-dom";

interface INotificationTableProps {
  notifications: notification[];
  isLoading: boolean;
}

function NotificationTable({
  isLoading,
  notifications,
}: INotificationTableProps) {
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
                نوع کاربر
                <button
                  className="btn btn-ghost btn-square btn-sm"
                  value="user_type"
                  onClick={(e) => handleSort(e.currentTarget.value)}
                >
                  <Swap />
                </button>
              </span>
            </th>
            <th align="right">
              <span className="inline-flex items-center text-sm text-grey-800">
                زمان ارسال
                <button
                  className="btn btn-ghost btn-square btn-sm"
                  value="created_at"
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
            <tr>
              <td>
                <Skeleton height={49} />
              </td>
              <td className="w-full">
                <Skeleton height={49} />
              </td>
              <td>
                <Skeleton height={49} />
              </td>
              <td>
                <Skeleton height={49} />
              </td>
              <td>
                <Skeleton height={49} />
              </td>
            </tr>
          ) : null}
          {notifications?.map((item, index: number) => (
            <tr>
              <td>
                {((+searchParams.get("page")! || 1) - 1) *
                  (+searchParams.get("page_size")! || 10) +
                  index +
                  1}
              </td>
              <td className="w-full">{item.title}</td>
              <td>
                <span
                  className={clsx(
                    "badge",
                    item.user_type === "REAL" &&
                      "bg-success-50 text-success-700",
                    item.user_type === "ALL" &&
                      "bg-secondary-50 text-secondary",
                    item.user_type === "JURIDICAL" &&
                      "bg-warning-50 text-warning"
                  )}
                >
                  {USER_TYPES[item.user_type]}
                </span>
              </td>
              <td>
                {new Intl.DateTimeFormat("fa-IR", {
                  dateStyle: "short",
                }).format(new Date(item.created_at))}
              </td>
              <td>
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

export { NotificationTable };
