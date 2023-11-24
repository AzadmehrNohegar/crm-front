import { getAccountAdminAccountById } from "@/api/account";
import { USER_TYPES } from "@/model";
import clsx from "clsx";
import { Fragment } from "react";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

function CustomersDetailsInfoTab() {
  const { account_id } = useParams();

  const { data: accountData, isLoading } = useQuery(
    `account-${account_id}`,
    () =>
      getAccountAdminAccountById({
        id: account_id,
      }),
    {
      enabled: !!account_id,
    }
  );

  if (isLoading)
    return (
      <Fragment>
        <Skeleton className="mb-4" height={32} />
        <Skeleton height={343} />
      </Fragment>
    );

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h2>
          {accountData?.data.customer?.contract_type === "REAL"
            ? `${accountData?.data.first_name} ${accountData?.data.last_name} `
            : accountData?.data.customer?.company_name}
        </h2>
        <span
          className={clsx(
            "badge inline-block min-w-max",
            accountData?.data.is_verified && "bg-success-50 text-success-700",
            !accountData?.data.is_verified && "bg-secondary-50 text-secondary"
          )}
        >
          {accountData?.data.is_verified ? "تایید شده" : "در انتظار تایید"}
        </span>
      </div>
      {accountData?.data.customer?.contract_type === "REAL" ? (
        <ul className="flex flex-col divide-y px-5 py-3 border border-grey-200 rounded-custom">
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">نوع کاربر</span>
            <strong
              className={clsx(
                "badge",
                accountData?.data.customer?.contract_type === "REAL" &&
                  "bg-success-50 text-success-700",
                accountData?.data.customer?.contract_type === "JURIDICAL" &&
                  "bg-warning-50 text-warning"
              )}
            >
              {USER_TYPES[accountData?.data.customer?.contract_type]}
            </strong>
          </li>
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">شماره موبایل</span>
            <strong>{accountData?.data.phone_number || "-"}</strong>
          </li>
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">کد ملی</span>
            <strong>
              {accountData?.data.customer?.user_national_code || "-"}
            </strong>
          </li>
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">کد پستی</span>
            <strong>{accountData?.data.customer?.postal_code || "-"}</strong>
          </li>
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">آدرس</span>
            <strong>{accountData?.data.customer?.address || "-"}</strong>
          </li>
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">تاریخ پیوستن</span>
            <strong>
              {new Intl.DateTimeFormat("fa-IR", {
                timeStyle: "short",
                dateStyle: "short",
              }).format(new Date(accountData?.data.created_at))}
            </strong>
          </li>
        </ul>
      ) : (
        <ul className="flex flex-col divide-y px-5 py-3 border border-grey-200 rounded-custom">
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">کد اقتصادی</span>
            <strong>{accountData?.data.company_economic_code || "-"}</strong>
          </li>
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">شناسه ملی</span>
            <strong>
              {accountData?.data.customer?.company_national_id || "-"}
            </strong>
          </li>
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">کد پستی</span>
            <strong>{accountData?.data.customer?.postal_code || "-"}</strong>
          </li>
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">آدرس</span>
            <strong>{accountData?.data.customer?.address || "-"}</strong>
          </li>
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">تاریخ پیوستن</span>
            <strong>
              {new Intl.DateTimeFormat("fa-IR", {
                timeStyle: "short",
                dateStyle: "short",
              }).format(new Date(accountData?.data.created_at))}
            </strong>
          </li>
        </ul>
      )}
    </div>
  );
}

export { CustomersDetailsInfoTab };
