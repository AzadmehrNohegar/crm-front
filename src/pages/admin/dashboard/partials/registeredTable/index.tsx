import { USER_TYPES, account } from "@/model";
import clsx from "clsx";
import { Show, Swap } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

interface IDashboardRegisteredTable {
  registers: account[];
  isLoading: boolean;
}

function DashboardRegisteredTable({
  isLoading,
  registers,
}: IDashboardRegisteredTable) {
  if (isLoading) return <Skeleton height={400} />;

  return (
    <div className="overflow-x-auto">
      <table className="table table-auto text-start">
        <thead className="bg-secondary-50">
          <tr>
            <th align="right">
              <span className="inline-flex items-center text-sm text-grey-800">
                نام کاربر
                <button className="btn btn-ghost btn-square btn-sm">
                  <Swap />
                </button>
              </span>
            </th>

            <th align="right">
              <span className="inline-flex items-center text-sm text-grey-800">
                نوع کاربر
                <button className="btn btn-ghost btn-square btn-sm">
                  <Swap />
                </button>
              </span>
            </th>
            <th align="right">
              <span className="inline-flex items-center text-sm text-grey-800">
                زمان درخواست
                <button className="btn btn-ghost btn-square btn-sm">
                  <Swap />
                </button>
              </span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {registers?.map((item: account) => (
            <tr key={item.id}>
              <td>
                {item.first_name} {item.last_name}
              </td>
              <td>
                <span
                  className={clsx(
                    "badge",
                    item.customer?.contract_type === "REAL" &&
                      "bg-success-50 text-success-700",
                    item.customer?.contract_type === "JURIDICAL" &&
                      "bg-warning-50 text-warning"
                  )}
                >
                  {USER_TYPES[item.customer?.contract_type]}
                </span>
              </td>
              <td>
                {new Intl.DateTimeFormat("fa-IR", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date(item.created_at))}
              </td>
              <td align="left">
                <Link
                  to={`/users/${item.id}`}
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

export { DashboardRegisteredTable };
