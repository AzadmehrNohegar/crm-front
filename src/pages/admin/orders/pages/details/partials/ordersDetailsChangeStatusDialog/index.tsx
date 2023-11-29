import { putOrderOrderListById } from "@/api/order";
import { Dialog } from "@/components/dialog";
import { RadioSelect } from "@/components/radioSelect";
import { IExtendedDialogProps, listOption } from "@/model";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const STATUS_TYPES: listOption[] = [
  {
    id: "canceled",
    label: "لغو شده",
  },
  {
    id: "processing",
    label: "در حال تامین",
  },
  {
    id: "sending",
    label: "در حال ارسال",
  },
  {
    id: "completed",
    label: "تکمیل شده",
  },
];

function OrdersDetailsChangeStatusDialog({
  closeModal,
  isOpen,
}: IExtendedDialogProps) {
  const { order_id } = useParams();

  const queryClient = useQueryClient();

  const [statusType, setProductType] = useState<listOption | null>(null);

  const updateOrder = useMutation(putOrderOrderListById, {
    onSuccess: () => {
      toast("وضعیت سفارش با موفقیت تغییر یافت", {
        type: "success",
      });
      queryClient.invalidateQueries();
      closeModal();
    },
  });

  const handleOrderStatusUpdate = () =>
    updateOrder.mutate({
      id: order_id,
      body: {
        status: statusType?.id,
      },
    });

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <Dialog.Title as="div" className="p-3.5 xl:p-5 text-start shadow-header">
        <h2 className="text-base xl:text-xl">تغییر وضعیت سفارش</h2>
      </Dialog.Title>
      <Dialog.Panel className="p-5 flex flex-col gap-y-6 min-h-[200px]">
        <span className="flex items-center gap-x-2">
          <span>آیا مایل به تغییر وضعیت سفارش</span>
          <strong>'شماره {order_id}'</strong>
          <span>هستید؟</span>
        </span>
        <RadioSelect
          variant="secondary"
          containerClassName="w-full"
          options={STATUS_TYPES}
          selected={statusType}
          setSelected={(option) => setProductType(option!)}
        />
        <div className="flex justify-end gap-x-4 mt-auto">
          <button
            onClick={closeModal}
            className="btn btn-link decoration-transparent btn-ghost min-w-[160px]"
          >
            انصراف
          </button>
          <button
            type="button"
            className="btn btn-secondary min-w-[160px] disabled:bg-grey-200"
            disabled={!statusType}
            onClick={handleOrderStatusUpdate}
          >
            تغییر وضعیت
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export { OrdersDetailsChangeStatusDialog };
