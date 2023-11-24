import {
  deleteAccountAdminAccountById,
  getAccountAdminAccountById,
} from "@/api/account";
import { Dialog } from "@/components/dialog";
import { IExtendedDialogProps } from "@/model";
import { Delete } from "react-iconly";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function CustomersDeleteDialog({ closeModal, isOpen }: IExtendedDialogProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { account_id } = useParams();

  const { data: accountData } = useQuery(
    `account-${account_id}`,
    () =>
      getAccountAdminAccountById({
        id: account_id,
      }),
    {
      enabled: !!account_id,
    }
  );

  const deleteAccount = useMutation(deleteAccountAdminAccountById, {
    onSuccess: () => {
      toast("حساب کاربری حذف شد.", {
        type: "info",
      });
      queryClient.invalidateQueries(["account-pagination"]);
      navigate("..");
    },
  });

  const handleDeleteAccount = () =>
    deleteAccount.mutate({
      id: accountData?.data.id.toString(),
    });

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <Dialog.Title as="div" className="p-3.5 xl:p-5 text-start shadow-header">
        <h2 className="text-base xl:text-xl">حذف کاربر</h2>
      </Dialog.Title>
      <Dialog.Panel className="p-5 flex flex-col gap-y-6 min-h-[200px]">
        <span className="flex items-center gap-x-2">
          <span>آیا از حذف کاربر</span>
          <strong>
            '
            {accountData?.data.customer?.contract_type === "REAL"
              ? `${accountData?.data.first_name} ${accountData?.data.last_name} `
              : accountData?.data.customer?.company_name}
            '
          </strong>
          <span>مطمئن هستید؟</span>
        </span>
        <div className="flex justify-end gap-x-4 mt-auto">
          <button
            onClick={closeModal}
            className="btn btn-link decoration-transparent btn-ghost min-w-[160px]"
          >
            انصراف
          </button>
          <button
            type="button"
            className="btn btn-error min-w-[160px]"
            onClick={handleDeleteAccount}
          >
            <Delete />
            حذف کاربر
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export { CustomersDeleteDialog };
