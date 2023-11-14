import { Swap } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { useSearchParams } from "react-router-dom";

interface ISettingsTableProps {
  admins?: unknown[];
  isLoading: boolean;
}

function SettingsTable({ isLoading, admins }: ISettingsTableProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(admins);
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
              <span className="text-sm text-grey-800">نام و نام خانوادگی</span>
            </th>
            <th align="right">
              <span className="inline-flex items-center text-sm text-grey-800">
                نام کاربری
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
                شماره موبایل
                <button
                  className="btn btn-ghost btn-square btn-sm"
                  value="type"
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
                  value="status"
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
          {/* {Settings_transactions?.map((item, index: number) => ( */}
          <tr>
            <td>
              {/* {((+searchParams.get("page")! || 1) - 1) *
                  (+searchParams.get("page_size")! || 10) +
                  index +
                  1} */}
              1
            </td>
            <td>مهدی سامانی</td>
            <td>mehdi_samani</td>
            <td>۰۹۱۲۶۳۷۲۹۳۴</td>
            <td>
              <span className="badge bg-success-50 text-success-700">فعال</span>
            </td>
          </tr>
          <tr>
            <td>
              {/* {((+searchParams.get("page")! || 1) - 1) *
                  (+searchParams.get("page_size")! || 10) +
                  index +
                  1} */}
              1
            </td>
            <td>مهدی سامانی</td>
            <td>mehdi_samani</td>
            <td>۰۹۱۲۶۳۷۲۹۳۴</td>
            <td>
              <span className="badge bg-success-50 text-success-700">فعال</span>
            </td>
          </tr>
          <tr>
            <td>
              {/* {((+searchParams.get("page")! || 1) - 1) *
                  (+searchParams.get("page_size")! || 10) +
                  index +
                  1} */}
              1
            </td>
            <td>مهدی سامانی</td>
            <td>mehdi_samani</td>
            <td>۰۹۱۲۶۳۷۲۹۳۴</td>
            <td>
              <span className="badge bg-success-50 text-success-700">فعال</span>
            </td>
          </tr>
          <tr>
            <td>
              {/* {((+searchParams.get("page")! || 1) - 1) *
                  (+searchParams.get("page_size")! || 10) +
                  index +
                  1} */}
              1
            </td>
            <td>مهدی سامانی</td>
            <td>mehdi_samani</td>
            <td>۰۹۱۲۶۳۷۲۹۳۴</td>
            <td>
              <span className="badge bg-success-50 text-success-700">فعال</span>
            </td>
          </tr>
          <tr>
            <td>
              {/* {((+searchParams.get("page")! || 1) - 1) *
                  (+searchParams.get("page_size")! || 10) +
                  index +
                  1} */}
              1
            </td>
            <td>مهدی سامانی</td>
            <td>mehdi_samani</td>
            <td>۰۹۱۲۶۳۷۲۹۳۴</td>
            <td>
              <span className="badge bg-success-50 text-success-700">فعال</span>
            </td>
          </tr>
          <tr>
            <td>
              {/* {((+searchParams.get("page")! || 1) - 1) *
                  (+searchParams.get("page_size")! || 10) +
                  index +
                  1} */}
              1
            </td>
            <td>مهدی سامانی</td>
            <td>mehdi_samani</td>
            <td>۰۹۱۲۶۳۷۲۹۳۴</td>
            <td>
              <span className="badge bg-success-50 text-success-700">فعال</span>
            </td>
          </tr>
          {/* ))} */}
        </tbody>
      </table>
    </div>
  );
}

export { SettingsTable };
