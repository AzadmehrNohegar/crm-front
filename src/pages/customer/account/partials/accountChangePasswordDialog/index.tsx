import { postAccountChangePassword } from "@/api/account";
import { Checkbox } from "@/components/checkbox";
import { Dialog } from "@/components/dialog";
import { Input } from "@/components/input";
import {
  PASSWORD_FORMAT_LEVEL_1,
  PASSWORD_FORMAT_LEVEL_2,
  PASSWORD_FORMAT_LEVEL_3,
} from "@/constants";
import { IExtendedDialogProps } from "@/model";
import { usePersianConvert } from "@/utils/usePersianConvert";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Hide, Show } from "react-iconly";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

interface IAccountChangePasswordDialogForm {
  old_password: string;
  new_password: string;
  repeat_new_password: string;
}

function AccountChangePasswordDialog({
  closeModal,
  isOpen,
}: IExtendedDialogProps) {
  const { convertPersian2English } = usePersianConvert();

  const [isPassword, setIsPassword] = useState(true);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { isValid, isDirty, errors },
  } = useForm<IAccountChangePasswordDialogForm>({
    defaultValues: {
      new_password: "",
      old_password: "",
      repeat_new_password: "",
    },
    mode: "onChange",
  });

  const changePassword = useMutation(postAccountChangePassword, {
    onSuccess: () => {
      toast("رمز عبور با موفقیت تغییر یافت.", {
        type: "success",
      });
      reset();
      closeModal();
    },
    onError: (err: AxiosError) => {
      if ((err?.response?.data as Record<string, string>).old_password)
        toast("رمز عبور قبلی اشتباه است.", {
          type: "error",
        });
    },
  });

  const onSubmit = (values: IAccountChangePasswordDialogForm) =>
    changePassword.mutate({
      body: {
        old_password: convertPersian2English(values.old_password),
        new_password: convertPersian2English(values.new_password),
        repeat_new_password: convertPersian2English(values.repeat_new_password),
      },
    });

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <Dialog.Title as="div" className="p-3.5 sm:p-5 text-start shadow-header">
        <h2 className="text-base sm:text-xl">تغییر رمز عبور</h2>
      </Dialog.Title>
      <Dialog.Panel
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 flex flex-col gap-y-6"
      >
        <Input
          type={isPassword ? "password" : "text"}
          className="input input-bordered w-full ltr text-end"
          label="رمز عبور قبلی"
          placeholder="رمز عبور قبلی را وارد کنید"
          error={errors.old_password}
          iconEnd={
            <button
              type="button"
              className="absolute end-4 inset-y-auto text-grey-600"
              onClick={() => setIsPassword((prevState) => !prevState)}
            >
              {isPassword ? <Show /> : <Hide />}
            </button>
          }
          {...register("old_password", {
            required: "رمز عبور خود را وارد کنید.",
            minLength: {
              value: 5,
              message: "رمز عبور بیشتر از ۵ کاراکتر است.",
            },
          })}
        />
        <Input
          type={isPassword ? "password" : "text"}
          className="input input-bordered w-full ltr text-end"
          label="رمز عبور جدید"
          placeholder="رمز عبور جدید را وارد کنید"
          error={errors.new_password}
          iconEnd={
            <button
              type="button"
              className="absolute end-4 inset-y-auto text-grey-600"
              onClick={() => setIsPassword((prevState) => !prevState)}
            >
              {isPassword ? <Show /> : <Hide />}
            </button>
          }
          {...register("new_password", {
            required: "رمز عبور خود را وارد کنید.",
            validate: (value) =>
              value !== getValues().old_password ||
              "رمز عبور جدیدی انتخاب کنید.",
            minLength: {
              value: 5,
              message: "رمز عبور بیشتر از ۵ کاراکتر است.",
            },
          })}
        />
        <Input
          type={isPassword ? "password" : "text"}
          className="input input-bordered w-full ltr text-end"
          label="تکرار رمز عبور جدید"
          placeholder="مجدد رمز عبور جدید را وارد کنید"
          error={errors.repeat_new_password}
          iconEnd={
            <button
              type="button"
              className="absolute end-4 inset-y-auto text-grey-600"
              onClick={() => setIsPassword((prevState) => !prevState)}
            >
              {isPassword ? <Show /> : <Hide />}
            </button>
          }
          {...register("repeat_new_password", {
            required: "رمز عبور خود را وارد کنید.",
            validate: (value) =>
              value === getValues().new_password ||
              "با رمز عبور جدید مطابقت ندارد.",
            minLength: {
              value: 5,
              message: "رمز عبور بیشتر از ۵ کاراکتر است.",
            },
          })}
        />
        <div className="flex items-start flex-col">
          <Checkbox
            checked={Boolean(
              watch("new_password").match(PASSWORD_FORMAT_LEVEL_1)
            )}
            labelClassName={
              watch("new_password").match(PASSWORD_FORMAT_LEVEL_1)
                ? "text-success"
                : "text-grey-800"
            }
            containerClassName="flex-row-reverse me-auto"
            className={
              watch("new_password").match(PASSWORD_FORMAT_LEVEL_1)
                ? "checkbox-success"
                : ""
            }
            label="حداقل 8 کاراکتر"
            readOnly
          />
          <Checkbox
            checked={Boolean(
              watch("new_password").match(PASSWORD_FORMAT_LEVEL_2)
            )}
            labelClassName={
              watch("new_password").match(PASSWORD_FORMAT_LEVEL_2)
                ? "text-success"
                : "text-grey-800"
            }
            containerClassName="flex-row-reverse me-auto"
            className={
              watch("new_password").match(PASSWORD_FORMAT_LEVEL_2)
                ? "checkbox-success"
                : ""
            }
            label="شامل حروف بزرگ و کوچک است"
            readOnly
          />
          <Checkbox
            checked={Boolean(
              watch("new_password").match(PASSWORD_FORMAT_LEVEL_3)
            )}
            labelClassName={
              watch("new_password").match(PASSWORD_FORMAT_LEVEL_3)
                ? "text-success"
                : "text-grey-800"
            }
            containerClassName="flex-row-reverse me-auto"
            className={
              watch("new_password").match(PASSWORD_FORMAT_LEVEL_3)
                ? "checkbox-success"
                : ""
            }
            label="شامل اعداد و کاراکترها"
            readOnly
          />
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
            ثبت
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export { AccountChangePasswordDialog };
