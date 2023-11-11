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

interface IAccountRealEditForm {
  first_name: string;
  last_name: string;
  phone_number: string;
  postal_code: string;
  address: string;
}

function AccountRealEdit({ resetForm }: IAccountEditProps) {
  const { data: userProfile } = useQuery("user-profile", () =>
    getAccountMyProfile()
  );

  const { convertPersian2English } = usePersianConvert();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields, isDirty, isValid },
  } = useForm<IAccountRealEditForm>({
    defaultValues: {
      address: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      postal_code: "",
    },
    values: {
      address: userProfile?.data.customer?.address || "",
      first_name: userProfile?.data.first_name || "",
      last_name: userProfile?.data.last_name || "",
      phone_number: userProfile?.data.phone_number || "",
      postal_code: userProfile?.data.customer?.postal_code || "",
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

  const onSubmit = (values: IAccountRealEditForm) => {
    console.log(dirtyFields);
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
          containerClassName="basis-modified"
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
          placeholder="کد پستی را وارد کنید"
          label="کد پستی"
          className="input input-bordered w-full"
          containerClassName="basis-modified"
          error={errors.postal_code}
          iconEnd={
            dirtyFields.postal_code ? (
              <button
                type="button"
                className="absolute end-4 inset-y-auto text-grey-600"
                onClick={() => setValue("postal_code", "")}
              >
                <Close />
              </button>
            ) : null
          }
          {...register("postal_code", {
            required: "این فیلد اجباری است.",
          })}
        />
        <Input
          type="text"
          placeholder="آدرس را وارد کنید"
          label="آدرس"
          className="input input-bordered w-full basis-full"
          error={errors.address}
          iconEnd={
            dirtyFields.address ? (
              <button
                type="button"
                className="absolute end-4 inset-y-auto text-grey-600"
                onClick={() => setValue("address", "")}
              >
                <Close />
              </button>
            ) : null
          }
          {...register("address", {
            required: "این فیلد اجباری است.",
          })}
        />
      </div>
      <div className="mt-auto flex justify-end items-center gap-x-4">
        <button
          type="button"
          className="btn btn-outline btn-primary w-40"
          onClick={resetForm}
        >
          انصراف
        </button>
        <button
          className="btn btn-primary w-40 disabled:bg-grey-200"
          disabled={!isDirty || !isValid}
        >
          ذخیره تغییرات
        </button>
      </div>
    </form>
  );
}

export { AccountRealEdit };
