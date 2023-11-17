import { product } from "@/model";
import { Show, Swap } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { Link, useSearchParams } from "react-router-dom";

interface IManagementTableProps {
  products?: product[];
  isLoading: boolean;
}

function ManagementTable({ isLoading, products }: IManagementTableProps) {
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
              <span className="text-sm text-grey-800">عنوان محصول</span>
            </th>
            <th align="right">
              <span className="inline-flex items-center text-sm text-grey-800">
                دسته‌بندی
                <button
                  className="btn btn-ghost btn-square btn-sm"
                  value="category"
                  onClick={(e) => handleSort(e.currentTarget.value)}
                >
                  <Swap />
                </button>
              </span>
            </th>

            <th align="right">
              <span className="inline-flex items-center text-sm text-grey-800">
                موجودی انبار
                <button
                  className="btn btn-ghost btn-square btn-sm"
                  value="total_inventory"
                  onClick={(e) => handleSort(e.currentTarget.value)}
                >
                  <Swap />
                </button>
              </span>
            </th>
            <th align="right"></th>
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
            </tr>
          ) : null}
          {products?.map((item, index: number) => (
            <tr>
              <td>
                {((+searchParams.get("page")! || 1) - 1) *
                  (+searchParams.get("page_size")! || 10) +
                  index +
                  1}
              </td>
              <td className="w-full">{item.name}</td>
              <td>{item.category.name}</td>
              <td>
                {item.total_inventory}
                {item.type === "WHOLESALE" ? "کیلوگرم" : "عدد"}
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

export { ManagementTable };
