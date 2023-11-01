import { getAccountMyProfile } from "@/api/account";
import { CONTRACT_TYPES } from "@/model";
import { Fragment, useState } from "react";
import { Edit, Lock } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import clsx from "clsx";
import { AccountChangePasswordDialog } from "./partials/accountChangePasswordDialog";
import { AccountRealEdit } from "./partials/accountRealEdit";
import { AccountJuridicalEdit } from "./partials/accountJuridical";

function Account() {
  const [
    isAccountChangePasswordDialogOpen,
    setIsAccountChangePasswordDialogOpen,
  ] = useState(false);

  const [edit, setEdit] = useState<"REAL" | "JURIDICAL" | null>(null);

  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery(
    "user-profile",
    () => getAccountMyProfile()
  );

  const resetEdit = () => {
    setEdit(null);
  };

  if (edit === "REAL") return <AccountRealEdit resetForm={resetEdit} />;

  if (edit === "JURIDICAL")
    return <AccountJuridicalEdit resetForm={resetEdit} />;

  return (
    <Fragment>
      <div className="min-h-innerContainer flex flex-col gap-y-4">
        <div className="flex items-center gap-x-2">
          <strong className="inline-flex flex-col gap-y-2">
            {isUserProfileLoading ? (
              <Skeleton width={144} height={50} />
            ) : (
              <Fragment>
                {userProfile?.data.first_name || "کاربر"}{" "}
                {userProfile?.data.last_name}
                <span
                  className={clsx(
                    "badge badge-lg text-sm font-normal",
                    userProfile?.data.customer?.contract_type === "REAL" &&
                      "bg-success-50 text-success",
                    userProfile?.data.customer?.contract_type === "JURIDICAL" &&
                      "bg-warning-50 text-warning"
                  )}
                >
                  {CONTRACT_TYPES[userProfile?.data.customer?.contract_type]}
                </span>
              </Fragment>
            )}
          </strong>
          <button
            className="btn btn-warning ms-auto text-grey-800"
            onClick={() => setIsAccountChangePasswordDialogOpen(true)}
          >
            <Lock />
            تغییر رمز عبور
          </button>
          <button
            className="btn btn-secondary btn-square"
            onClick={() => setEdit(userProfile?.data.customer?.contract_type)}
          >
            <Edit />
          </button>
        </div>
        {userProfile?.data.customer?.contract_type === "REAL" ? (
          <ul className="flex flex-col divide-y px-5 py-3 border border-grey-200 rounded-custom">
            <li className="flex items-center justify-between py-4 text-sm">
              <span className="text-grey-600 font-light">شماره موبایل</span>
              <strong>{userProfile?.data.phone_number || "-"}</strong>
            </li>
            <li className="flex items-center justify-between py-4 text-sm">
              <span className="text-grey-600 font-light">کد ملی</span>
              <strong>
                {userProfile?.data.customer?.user_national_code || "-"}
              </strong>
            </li>
            <li className="flex items-center justify-between py-4 text-sm">
              <span className="text-grey-600 font-light">کد پستی</span>
              <strong>{userProfile?.data.customer?.postal_code || "-"}</strong>
            </li>
            <li className="flex items-center justify-between py-4 text-sm">
              <span className="text-grey-600 font-light">آدرس</span>
              <strong>{userProfile?.data.customer?.address || "-"}</strong>
            </li>
          </ul>
        ) : (
          <ul className="flex flex-col divide-y px-5 py-3 border border-grey-200 rounded-custom">
            <li className="flex items-center justify-between py-4 text-sm">
              <span className="text-grey-600 font-light">کد اقتصادی</span>
              <strong>{userProfile?.data.company_economic_code || "-"}</strong>
            </li>
            <li className="flex items-center justify-between py-4 text-sm">
              <span className="text-grey-600 font-light">شناسه ملی</span>
              <strong>
                {userProfile?.data.customer?.company_national_id || "-"}
              </strong>
            </li>
            <li className="flex items-center justify-between py-4 text-sm">
              <span className="text-grey-600 font-light">کد پستی</span>
              <strong>{userProfile?.data.customer?.postal_code || "-"}</strong>
            </li>
            <li className="flex items-center justify-between py-4 text-sm">
              <span className="text-grey-600 font-light">آدرس</span>
              <strong>{userProfile?.data.customer?.address || "-"}</strong>
            </li>
          </ul>
        )}
      </div>
      <AccountChangePasswordDialog
        isOpen={isAccountChangePasswordDialogOpen}
        closeModal={() => setIsAccountChangePasswordDialogOpen(false)}
      />
    </Fragment>
  );
}

export default Account;
