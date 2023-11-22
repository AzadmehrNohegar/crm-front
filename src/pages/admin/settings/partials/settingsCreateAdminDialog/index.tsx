import { postAccountAdminList } from "@/api/account";
import { Close } from "@/assets/icons/Close";
import { Dialog } from "@/components/dialog";
import { Input } from "@/components/input";
import { MOBILE_FORMAT } from "@/constants";
import { IExtendedDialogProps } from "@/model";
import { usePersianConvert } from "@/utils/usePersianConvert";
import { AxiosError } from "axios";
// import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
// import { useMutation } from "react-query";
// import { toast } from "react-toastify";

interface IAccountChangePasswordDialogForm {
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
}

function SettingsCreateAdminDialog({
  closeModal,
  isOpen,
}: IExtendedDialogProps) {
  const { convertPersian2English } = usePersianConvert();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    // reset,
    setValue,
    formState: { isValid, isDirty, errors, dirtyFields },
  } = useForm<IAccountChangePasswordDialogForm>({
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      password: "",
    },
    mode: "onChange",
  });

  const createAdmin = useMutation(postAccountAdminList, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-list-pagination"]);
      toast("ادمین جدید اضافه شد.", {
        type: "success",
      });
      closeModal();
    },
    onError: (err: AxiosError) => {
      if ((err?.response?.data as Record<string, string>).phone_number)
        toast("شماره تلفن قبلا ثبت شده است.", {
          type: "error",
        });
    },
  });

  const onSubmit = (values: IAccountChangePasswordDialogForm) =>
    createAdmin.mutate({
      body: {
        ...values,
        role: "ADMIN",
      },
    });

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <Dialog.Title as="div" className="p-3.5 xl:p-5 text-start shadow-header">
        <h2 className="text-base xl:text-xl">افزودن ادمین</h2>
      </Dialog.Title>
      <Dialog.Panel
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 flex flex-col gap-y-6"
      >
        <Input
          type="text"
          className="input input-bordered w-full ltr text-end"
          label="نام"
          placeholder="نام را وارد کنید"
          error={errors.first_name}
          iconEnd={
            dirtyFields.first_name ? (
              <button
                type="button"
                className="absolute end-4 inset-y-auto text-grey-600"
                onClick={() => setValue("first_name", "")}
              >
                <Close />
              </button>
            ) : null
          }
          {...register("first_name")}
        />
        <Input
          type="text"
          className="input input-bordered w-full ltr text-end"
          label="نام خانوادگی"
          placeholder="نام خانوادگی را وارد کنید"
          error={errors.last_name}
          iconEnd={
            dirtyFields.last_name ? (
              <button
                type="button"
                className="absolute end-4 inset-y-auto text-grey-600"
                onClick={() => setValue("last_name", "")}
              >
                <Close />
              </button>
            ) : null
          }
          {...register("last_name")}
        />
        <Input
          type="tel"
          placeholder="شماره موبایل را وارد کنید"
          label="شماره موبایل"
          className="input input-bordered w-full ltr text-end"
          error={errors.phone_number}
          iconEnd={
            dirtyFields.phone_number ? (
              <button
                type="button"
                className="absolute end-4 inset-y-auto text-grey-600"
                onClick={() => setValue("phone_number", "")}
              >
                <Close />
              </button>
            ) : null
          }
          {...register("phone_number", {
            required: "شماره موبایل خود را وارد کنید.",
            validate: (value) =>
              (convertPersian2English(value).match(MOBILE_FORMAT) &&
                value.length === 11) ||
              "شماره موبایل نادرست است.",
          })}
        />
        <Input
          type="text"
          className="input input-bordered w-full ltr text-end"
          label="رمز عبور"
          placeholder="رمز عبور را وارد کنید"
          error={errors.password}
          iconEnd={
            dirtyFields.password ? (
              <button
                type="button"
                className="absolute end-4 inset-y-auto text-grey-600"
                onClick={() => setValue("password", "")}
              >
                <Close />
              </button>
            ) : null
          }
          {...register("password", {
            required: "این فیلد اجباری است.",
            minLength: 6,
          })}
        />

        <div className="flex justify-end mt-6 gap-x-4">
          <button
            type="button"
            onClick={closeModal}
            className="btn btn-outline btn-secondary min-w-[160px]"
          >
            انصراف
          </button>
          <button
            className="btn btn-secondary min-w-[160px]"
            disabled={!isValid || !isDirty}
          >
            ثبت
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export { SettingsCreateAdminDialog };
