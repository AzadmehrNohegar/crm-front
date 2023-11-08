import {
  STATUS_TYPE,
  WALLET_TRANSACTION_TYPE,
  wallet_transaction,
} from "@/model";
import clsx from "clsx";
import { Swap } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { useSearchParams } from "react-router-dom";

interface IWalletTableProps {
  wallet_transactions?: wallet_transaction[];
  isLoading: boolean;
}

function WalletTable({ isLoading, wallet_transactions }: IWalletTableProps) {
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
        <thead className="bg-grey-50">
          <tr>
            <th align="right">
              <span className="text-2xl font-light">#</span>
            </th>
            <th align="right">
              <span className="text-sm text-grey-800">شرح تراکنش</span>
            </th>
            <th align="right">
              <span className="inline-flex items-center text-sm text-grey-800">
                شماره تراکنش
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
                نوع
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
                مبلغ
                <button
                  className="btn btn-ghost btn-square btn-sm"
                  value="amount"
                  onClick={(e) => handleSort(e.currentTarget.value)}
                >
                  <Swap />
                </button>
              </span>
            </th>
            <th align="right">
              <span className="inline-flex items-center text-sm text-grey-800">
                زمان تراکنش
                <button
                  className="btn btn-ghost btn-square btn-sm"
                  value="created_date"
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
              <td>
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
            </tr>
          ) : null}
          {wallet_transactions?.map((item, index: number) => (
            <tr key={item.id}>
              <td>
                {((+searchParams.get("page")! || 1) - 1) *
                  (+searchParams.get("page_size")! || 10) +
                  index +
                  1}
              </td>
              <td>{item.description}</td>
              <td>{item.id}</td>
              <td>
                <span
                  className={
                    item.type === "deposit" ? "text-success-400" : "text-danger"
                  }
                >
                  {WALLET_TRANSACTION_TYPE[item.type]}
                </span>
              </td>
              <td>{Number(item.amount).toLocaleString()} تومان</td>
              <td>
                {new Intl.DateTimeFormat("fa-IR", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date(item.created_date))}
              </td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { WalletTable };
