import { IS_ACTIVE, admin } from "@/model";
import clsx from "clsx";
import { Swap } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { useSearchParams } from "react-router-dom";

interface ISettingsTableProps {
  admins?: admin[];
  isLoading: boolean;
}

function SettingsTable({ isLoading, admins }: ISettingsTableProps) {
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
              <span className="text-sm text-grey-800">
                نام و نام خانوادگی
                <button
                  className="btn btn-ghost btn-square btn-sm"
                  value="first_name"
                  onClick={(e) => handleSort(e.currentTarget.value)}
                >
                  <Swap />
                </button>
              </span>
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
                وضعیت
                <button
                  className="btn btn-ghost btn-square btn-sm"
                  value="is_verified"
                  onClick={(e) => handleSort(e.currentTarget.value)}
                >
                  <Swap />
                </button>
              </span>
            </th>
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
            </tr>
          ) : null}
          {admins?.map((item, index: number) => (
            <tr key={item.id}>
              <td>
                {((+searchParams.get("page")! || 1) - 1) *
                  (+searchParams.get("page_size")! || 10) +
                  index +
                  1}
              </td>
              <td className="w-full">
                {item.first_name} {item.last_name}
              </td>
              <td>
                <span className="ltr text-end bidi-override">
                  {item.phone_number}
                </span>
              </td>
              <td>
                <span
                  className={clsx(
                    "badge",
                    item.is_verified && "bg-success-50 text-success-700",
                    !item.is_verified && "bg-grey-50 text-grey-700"
                  )}
                >
                  {IS_ACTIVE[`${item.is_verified}`]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { SettingsTable };
