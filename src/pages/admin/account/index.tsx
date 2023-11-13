import { getAccountMyProfile } from "@/api/account";
import { Fragment, useState } from "react";
import { Edit, Lock } from "react-iconly";
import { useQuery } from "react-query";
import { AccountChangePasswordDialog } from "./partials/accountChangePasswordDialog";
import { AccountEdit } from "./partials/accountEdit";

function Account() {
  const [
    isAccountChangePasswordDialogOpen,
    setIsAccountChangePasswordDialogOpen,
  ] = useState(false);

  const [edit, setEdit] = useState<boolean>(false);

  const { data: userProfile } = useQuery("user-profile", () =>
    getAccountMyProfile()
  );

  const resetEdit = () => setEdit(false);

  if (edit) return <AccountEdit resetForm={resetEdit} />;

  return (
    <Fragment>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-2 justify-between">
          <button
            className="btn btn-warning text-grey-800"
            onClick={() => setIsAccountChangePasswordDialogOpen(true)}
          >
            <Lock />
            تغییر رمز عبور
          </button>
          <button
            className="btn btn-secondary btn-square"
            onClick={() => setEdit(true)}
          >
            <Edit />
          </button>
        </div>
        <ul className="flex flex-col divide-y px-5 py-3 border border-grey-200 rounded-custom">
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">نام</span>
            <strong>{userProfile?.data.first_name || "-"}</strong>
          </li>
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">نام خانوادگی</span>
            <strong>{userProfile?.data.last_name || "-"}</strong>
          </li>
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">شماره موبایل</span>
            <strong>{userProfile?.data.phone_number || "-"}</strong>
          </li>
        </ul>
      </div>
      <AccountChangePasswordDialog
        isOpen={isAccountChangePasswordDialogOpen}
        closeModal={() => setIsAccountChangePasswordDialogOpen(false)}
      />
    </Fragment>
  );
}

export default Account;
