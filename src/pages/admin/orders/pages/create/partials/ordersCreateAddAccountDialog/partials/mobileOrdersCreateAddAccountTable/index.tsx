import { USER_TYPES, account } from "@/model";
import clsx from "clsx";
import { Fragment } from "react";
import { Show } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

interface IMobileOrdersCreateAccountTable {
  accounts?: account[];
  isLoading: boolean;
  selectedAccount: account | null;
  setSelectedAccount: (account: account) => void;
}

function MobileOrdersCreateAccountTable({
  isLoading,
  accounts,
  selectedAccount,
  setSelectedAccount,
}: IMobileOrdersCreateAccountTable) {
  return (
    <div className="overflow-x-auto max-h-72 overflow-y-auto">
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
            </div>
          </Fragment>
        ) : (
          accounts?.map((item, index: number) => (
            <div
              key={item.id}
              onClick={() => setSelectedAccount(item)}
              className={clsx(
                "transition-colors cursor-pointer flex-col p-3.5 text-sm",
                selectedAccount?.id === item.id && "bg-secondary-50"
              )}
            >
              <span className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center">
                  <span className="inline-block p-1.5 bg-grey-100 w-7 text-center rounded-lg me-2">
                    {index + 1}
                  </span>
                  {item.first_name} {item.last_name}
                </span>

                <Link
                  to={`/users/${item.id}`}
                  className="btn btn-ghost btn-sm text-grey-800 px-0"
                >
                  <Show size="small" />
                </Link>
              </span>
              <ul className="flex flex-col gap-y-4">
                <li className="flex items-center justify-between">
                  <span className="text-sm font-semibold">شماره موبایل</span>
                  <span className="font-light">{item.phone_number}</span>
                </li>

                <li className="flex items-center justify-between">
                  <span className="text-sm font-semibold">نوع کاربر</span>
                  <span
                    className={clsx(
                      "badge font-light",
                      item.customer?.contract_type === "REAL" &&
                        "bg-success-50 text-success-700",
                      item.customer?.contract_type === "JURIDICAL" &&
                        "bg-warning-50 text-warning"
                    )}
                  >
                    {USER_TYPES[item.customer?.contract_type]}
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

export { MobileOrdersCreateAccountTable };
