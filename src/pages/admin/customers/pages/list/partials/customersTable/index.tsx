import { USER_TYPES, account } from "@/model";
import clsx from "clsx";
import { Show, Swap } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { Link, useSearchParams } from "react-router-dom";

interface ICustomersTableProps {
  accounts?: account[];
  isLoading: boolean;
}

function CustomersTable({ isLoading, accounts }: ICustomersTableProps) {
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
            <th align="right" className="w-full">
              <span className="text-sm text-grey-800">نام و نام خانوادگی</span>
            </th>

            <th align="right">
              <span className="inline-flex items-center text-sm text-grey-800">
                شماره موبایل
                <button
                  className="btn btn-ghost btn-square btn-sm"
                  value="phone_number"
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
                  value="account__contract_type"
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
                  value="type"
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
                <Skeleton />
              </td>
              <td className="w-full">
                <Skeleton />
              </td>

              <td>
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
            </tr>
          ) : null}
          {accounts?.map((item, index: number) => (
            <tr key={item.id}>
              <td>
                {((+searchParams.get("page")! || 1) - 1) *
                  (+searchParams.get("page_size")! || 10) +
                  index +
                  1}
              </td>
              <td className="w-full">
                {item.customer?.contract_type === "REAL"
                  ? `${item.first_name} ${item.last_name} `
                  : item.customer?.company_name}
              </td>
              <td>{item.phone_number}</td>
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
                <span
                  className={clsx(
                    "badge inline-block min-w-max",
                    item.is_verified && "bg-success-50 text-success-700",
                    !item.is_verified && "bg-secondary-50 text-secondary"
                  )}
                >
                  {item.is_verified ? "تایید شده" : "در انتظار تایید"}
                </span>
              </td>
              <td>
                <Link to={`/users/${item.id}`}>
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

export { CustomersTable };
