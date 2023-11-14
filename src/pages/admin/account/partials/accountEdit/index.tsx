import { getAccountMyProfile, putAccountUserUpdate } from "@/api/account";
import { Close } from "@/assets/icons/Close";
import { Input } from "@/components/input";
import { MOBILE_FORMAT } from "@/constants";
import { usePersianConvert } from "@/utils/usePersianConvert";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

interface IAccountEditProps {
  resetForm: () => void;
}

interface IAccountEditForm {
  first_name: string;
  last_name: string;
  phone_number: string;
}

function AccountEdit({ resetForm }: IAccountEditProps) {
  const { data: userProfile } = useQuery("user-profile", () =>
    getAccountMyProfile()
  );

  const { convertPersian2English } = usePersianConvert();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields, isDirty, isValid },
  } = useForm<IAccountEditForm>({
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
    },
    values: {
      first_name: userProfile?.data.first_name || "",
      last_name: userProfile?.data.last_name || "",
      phone_number: userProfile?.data.phone_number || "",
    },
    mode: "onChange",
  });

  const updateUser = useMutation(putAccountUserUpdate, {
    onSuccess: () => {
      toast("اطلاعات کاربر تغییر یافت.", {
        type: "success",
      });
    },
    onError: (err: AxiosError) => {
      if ((err?.response?.data as Record<string, string>).user_national_code)
        toast("کد ملی قبلا ثبت شده است.", {
          type: "error",
        });
    },
  });

  const onSubmit = (values: IAccountEditForm) => {
    updateUser.mutate({
      body: {
        ...values,
      },
    });
  };

  return (
    <form
      className="flex flex-col justify-end h-full pb-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-wrap gap-4">
        <Input
          type="text"
          placeholder="نام را وارد کنید"
          label="نام"
          className="input input-bordered w-full"
          containerClassName="basis-modified"
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
          {...register("first_name", {
            required: "این فیلد اجباری است.",
          })}
        />
        <Input
          type="text"
          placeholder="نام خانوادگی را وارد کنید"
          label="نام خانوادگی"
          className="input input-bordered w-full"
          containerClassName="basis-modified"
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
          {...register("last_name", {
            required: "این فیلد اجباری است.",
          })}
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
      </div>
      <div className="mt-auto flex justify-end items-center gap-x-4">
        <button
          type="button"
          className="btn btn-outline btn-secondary w-40"
          onClick={resetForm}
        >
          انصراف
        </button>
        <button
          className="btn btn-secondary w-40 disabled:bg-grey-200"
          disabled={!isDirty || !isValid}
        >
          ذخیره تغییرات
        </button>
      </div>
    </form>
  );
}

export { AccountEdit };
