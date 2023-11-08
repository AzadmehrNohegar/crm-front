import { postOrderCreateOrder } from "@/api/order";
import { Attach } from "@/assets/icons/Attach";
import { Dialog } from "@/components/dialog";
import { Input } from "@/components/input";
import { IExtendedDialogProps } from "@/model";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

interface ICheckoutOfflineFileUploadDialogForm {
  file: FileList | null;
}

function CheckoutOfflineFileUploadDialog({
  closeModal,
  isOpen,
}: IExtendedDialogProps) {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = useForm<ICheckoutOfflineFileUploadDialogForm>({
    defaultValues: {
      file: null,
    },
    mode: "onChange",
  });

  const checkoutCart = useMutation(postOrderCreateOrder, {
    onSuccess: (res) => {
      const { order_id } = res.data as { order_id: number };
      navigate(`/orders/${order_id}`);
      toast("سفارش شما با موفقیت ثبت شد.", {
        type: "success",
      });
    },
  });

  const onSubmit = (values: ICheckoutOfflineFileUploadDialogForm) => {
    const formData = new FormData();
    if (searchParams.get("need_tax")) {
      formData.append("need_tax", "true");
    } else {
      formData.append("need_tax", "false");
    }
    if (searchParams.get("use_wallet")) {
      formData.append("use_wallet", "true");
    } else {
      formData.append("use_wallet", "false");
    }
    formData.append(
      "payment_type",
      searchParams.get("payment_type") || "online"
    );
    formData.append("file", values.file![0]);

    checkoutCart.mutate({
      body: formData,
    });
  };

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <Dialog.Title as="div" className="p-3.5 sm:p-5 text-start shadow-header">
        <h2 className="text-base sm:text-xl">افزایش موجودی</h2>
      </Dialog.Title>
      <Dialog.Panel
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 flex flex-col gap-y-6"
      >
        <div className="flex items-end gap-x-3">
          <input
            id="file"
            className="hidden"
            type="file"
            {...register("file", {
              required: true,
            })}
          />
          <Controller
            control={control}
            name="file"
            render={({ field: { value } }) => (
              <Input
                type="text"
                value={value?.[0]?.name || ""}
                placeholder="فایل مورد نظر را وارد کنید."
                label="افزودن فایل"
                className="input input-bordered w-full"
                disabled
              />
            )}
          />

          <label className="btn btn-secondary btn-square" htmlFor="file">
            <Attach />
          </label>
        </div>
        <div className="flex justify-end mt-6 gap-x-4">
          <button
            type="button"
            onClick={closeModal}
            className="btn btn-outline btn-primary min-w-[160px]"
          >
            انصراف
          </button>
          <button
            className="btn btn-primary min-w-[160px]"
            disabled={!isValid || !isDirty}
          >
            پرداخت
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export { CheckoutOfflineFileUploadDialog };
