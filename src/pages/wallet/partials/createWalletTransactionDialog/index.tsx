import { Dialog } from "@/components/dialog";
import { Input } from "@/components/input";
import { IExtendedDialogProps } from "@/model";
import { useForm } from "react-hook-form";

interface ICreateWalletTransactionDialogForm {
  amount: string;
  description: string;
}

interface ICreateWalletTransactionDialogProps extends IExtendedDialogProps {
  customer: number;
}

function CreateWalletTransactionDialog({
  closeModal,
  isOpen,
  customer,
}: ICreateWalletTransactionDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: {
      amount: "",
      description: "",
    },
  });

  const onSubmit = (values: ICreateWalletTransactionDialogForm) =>
    console.log(values, customer);

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <Dialog.Title as="div" className="p-5 text-start shadow-header">
        <h2 className="text-xl">افزایش موجودی</h2>
      </Dialog.Title>
      <Dialog.Panel
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 flex flex-col gap-y-6"
      >
        <Input
          label="افزایش اعتبار"
          placeholder="مبلغ مورد نظر را وارد کنید"
          className="input input-bordered w-full ltr text-end"
          error={errors.amount}
          iconEnd={
            <div className="absolute end-0 flex items-center h-full px-3.5 bg-grey-50 border border-grey-200 inset-y-auto text-grey-600 rounded-e-lg">
              <span>تومان</span>
            </div>
          }
          {...register("amount", {
            required: "لطفا مقدار تراکنش را وارد کنید.",
            minLength: {
              value: 4,
              message: "مقدار وارد شده از حد مجاز کمتر است.",
            },
          })}
        />
        <Input
          label="شرح تراکنش"
          placeholder="شرح تراکنش  را وارد کنید"
          className="input input-bordered w-full"
          error={errors.description}
          {...register("description")}
        />
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

export { CreateWalletTransactionDialog };
