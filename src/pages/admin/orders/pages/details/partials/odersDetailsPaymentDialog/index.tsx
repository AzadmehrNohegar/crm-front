import { getOrderOrderListById } from "@/api/order";
import { postPaymentCreatePayment } from "@/api/payment";
import { Attach } from "@/assets/icons/Attach";
import { Dialog } from "@/components/dialog";
import { Input } from "@/components/input";
import { IExtendedDialogProps } from "@/model";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";
import { Wallet } from "react-iconly";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface IOrdersDetailsPaymentDialogForm {
  file: FileList | null;
  payment_type: "WALLET" | "OFFLINE";
}

function OrdersDetailsPaymentDialog({
  closeModal,
  isOpen,
}: IExtendedDialogProps) {
  const { order_id } = useParams();

  const queryClient = useQueryClient();

  const { data: orderDetails } = useQuery(`order-${order_id}`, () =>
    getOrderOrderListById({
      id: order_id,
    })
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isValid },
  } = useForm<IOrdersDetailsPaymentDialogForm>({
    defaultValues: {
      file: null,
      payment_type: "OFFLINE",
    },
    mode: "onChange",
  });

  const createPayment = useMutation(postPaymentCreatePayment, {
    onSuccess: () => {
      toast("پرداخت با موفقیت انجام شد.", {
        type: "success",
      });
      queryClient.invalidateQueries();
      closeModal();
    },
  });

  const isDisabled = () => {
    if (watch("payment_type") === "OFFLINE") return !isValid;
    return (
      !isValid ||
      orderDetails?.data.customer?.wallet < orderDetails?.data.amount
    );
  };

  const onSubmit = (values: IOrdersDetailsPaymentDialogForm) => {
    if (values.payment_type === "OFFLINE") {
      const formData = new FormData();
      formData.append("order_id", order_id?.toString() || "");
      formData.append("payment_type", "OFFLINE");
      formData.append("file", values.file![0]);
      createPayment.mutate({
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      createPayment.mutate({
        body: {
          order_id: +order_id!,
          payment_type: "WALLET",
        },
      });
    }
  };

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <Dialog.Title as="div" className="p-3.5 xl:p-5 text-start shadow-header">
        <h2 className="text-base xl:text-xl">افزایش موجودی</h2>
      </Dialog.Title>
      <Dialog.Panel
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 flex flex-col gap-y-6"
      >
        <div className="flex items-center gap-x-4">
          <h5 className="font-bold me-auto">انتخاب روش پرداخت</h5>
          <label
            htmlFor="payment_type_offline"
            className={clsx(
              "inline-flex items-center gap-x-2",
              watch("payment_type") === "OFFLINE" && "text-secondary",
              watch("payment_type") !== "OFFLINE" && "text-grey-800"
            )}
          >
            <input
              id="payment_type_offline"
              type="radio"
              className="radio radio-secondary h-5 w-5"
              value="OFFLINE"
              {...register("payment_type")}
            />
            <span>پرداخت آفلاین</span>
          </label>
          <label
            htmlFor="payment_type_wallet"
            className={clsx(
              "inline-flex items-center gap-x-2",
              watch("payment_type") === "WALLET" && "text-secondary",
              watch("payment_type") !== "WALLET" && "text-grey-800"
            )}
          >
            <input
              id="payment_type_wallet"
              type="radio"
              className="radio radio-secondary h-5 w-5"
              value="WALLET"
              {...register("payment_type")}
            />
            <span>پرداخت از کیف پول</span>
          </label>
        </div>
        {watch("payment_type") === "OFFLINE" ? (
          <div className="flex items-end gap-x-3">
            <input
              id="file"
              className="hidden"
              type="file"
              {...register("file", {
                required: watch("payment_type") === "OFFLINE",
              })}
            />
            <Controller
              control={control}
              name="file"
              render={({ field: { value } }) => (
                <Input
                  type="text"
                  readOnly
                  value={value?.[0]?.name || ""}
                  placeholder="فایل مورد نظر را وارد کنید."
                  label="افزودن فایل"
                  className="input input-bordered w-full"
                />
              )}
            />

            <label className="btn btn-secondary btn-square" htmlFor="file">
              <Attach />
            </label>
          </div>
        ) : (
          <span
            className={clsx(
              "text-sm flex items-center py-3 px-4 rounded-xl text-grey-600 gap-x-2 w-full",
              orderDetails?.data.customer?.wallet >=
                orderDetails?.data.amount && "bg-secondary-100",
              orderDetails?.data.customer?.wallet < orderDetails?.data.amount &&
                "bg-danger-100"
            )}
          >
            <Wallet />
            موجودی کیف پول
            <span className="inline-flex items-center gap-x-2 ms-auto">
              <strong className="text-grey-800">
                {Number(orderDetails?.data.customer?.wallet).toLocaleString()}{" "}
              </strong>
              تومان
            </span>
          </span>
        )}

        <div className="flex justify-end mt-6 gap-x-4">
          <button
            type="button"
            onClick={closeModal}
            className="btn btn-link decoration-transparent btn-ghost min-w-[160px]"
          >
            انصراف
          </button>
          <button
            className="btn btn-secondary min-w-[160px]"
            disabled={isDisabled()}
          >
            پرداخت
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export { OrdersDetailsPaymentDialog };
