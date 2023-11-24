import {
  getAccountAdminAccountById,
  postAccountAuthRegistration,
  putAccountAdminAccountById,
  putAccountAdminCustomerById,
} from "@/api/account";
import { Close } from "@/assets/icons/Close";
import { Input } from "@/components/input";
import { AxiosError } from "axios";
import clsx from "clsx";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface ICustomersCreateRealForm {
  first_name: string;
  last_name: string;
  user_national_code: string;
  phone_number: string;
  postal_code: string;
  address: string;
  is_verified: boolean;
}

function CustomersCreateReal() {
  const queryClient = useQueryClient();

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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { dirtyFields, errors, isDirty, isValid },
    watch,
  } = useForm<ICustomersCreateRealForm>({
    defaultValues: {
      first_name: "",
      last_name: "",
      user_national_code: "",
      phone_number: "",
      postal_code: "",
      address: "",
      is_verified: false,
    },
    values: {
      first_name: accountData?.data.first_name || "",
      last_name: accountData?.data.last_name || "",
      phone_number: accountData?.data.phone_number || "",
      user_national_code: accountData?.data.customer?.user_national_code || "",
      postal_code: accountData?.data.customer?.postal_code || "",
      address: accountData?.data.customer?.address || "",
      is_verified: accountData?.data.is_verified || false,
    },
  });

  const editRealAccount = useMutation(putAccountAdminAccountById, {
    onError: (err: AxiosError) => {
      if ((err?.response?.data as Record<string, string>).company_national_id) {
        toast("کد ملی مجموعه قبلا ثبت شده است.", {
          type: "error",
        });
      } else if ((err?.response?.data as Record<string, string>).phone_number)
        toast("شماره تلفن قبلا ثبت شده است.", {
          type: "error",
        });
    },
  });
  const editRealCustomer = useMutation(putAccountAdminCustomerById, {
    onSuccess: () => {
      toast("تغییرات کاربر اعمال شدند", {
        type: "info",
      });
      queryClient.invalidateQueries();
    },
    onError: (err: AxiosError) => {
      if ((err?.response?.data as Record<string, string>).company_national_id) {
        toast("کد ملی مجموعه قبلا ثبت شده است.", {
          type: "error",
        });
      } else if ((err?.response?.data as Record<string, string>).phone_number)
        toast("شماره تلفن قبلا ثبت شده است.", {
          type: "error",
        });
    },
  });

  const createRealAccount = useMutation(postAccountAuthRegistration, {
    onSuccess: () => {
      toast("کاربر جدید ایجاد شد.", {
        type: "success",
      });
      queryClient.invalidateQueries();
    },
    onError: (err: AxiosError) => {
      if ((err?.response?.data as Record<string, string>).user_national_code) {
        toast("کد ملی قبلا ثبت شده است.", {
          type: "error",
        });
      } else if ((err?.response?.data as Record<string, string>).phone_number)
        toast("شماره تلفن قبلا ثبت شده است.", {
          type: "error",
        });
    },
  });

  const onSubmit = (values: ICustomersCreateRealForm) => {
    if (account_id) {
      editRealAccount
        .mutateAsync({
          id: account_id,
          body: {
            first_name: values.first_name,
            last_name: values.last_name,
            phone_number: values.phone_number,
            is_verified: values.is_verified,
          },
        })
        .then(() =>
          editRealCustomer.mutate({
            id: accountData?.data.customer?.id,
            body: {
              address: values.address,
              user_national_code: values.user_national_code,
              postal_code: values.postal_code,
              account: account_id,
            },
          })
        );
    } else {
      createRealAccount.mutate({
        body: {
          user_type: "REAL",
          ...values,
        },
      });
    }
  };
  return (
    <form
      className="w-full flex flex-col h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      {account_id ? (
        <Fragment>
          <h2>آیا حساب کاربر را با مشخصات زیر تایید میکنید؟</h2>
          <label
            htmlFor="is_verified"
            className={clsx(
              "w-96 flex items-center justify-between py-4 px-5 rounded-xl my-4 border cursor-pointer",
              !watch("is_verified") && "border-grey-200",
              watch("is_verified") && "border-success bg-success-50"
            )}
          >
            <span>تایید کاربر</span>
            <input
              id="is_verified"
              type="checkbox"
              className="toggle toggle-secondary toggle-sm -scale-x-100"
              {...register("is_verified")}
            />
          </label>
        </Fragment>
      ) : null}{" "}
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
          type="text"
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
            required: "این فیلد اجباری است.",
          })}
        />
        <Input
          type="text"
          placeholder="کد ملی را وارد کنید"
          label="کد ملی"
          className="input input-bordered w-full"
          containerClassName="basis-modified"
          error={errors.user_national_code}
          iconEnd={
            dirtyFields.user_national_code ? (
              <button
                type="button"
                className="absolute end-4 inset-y-auto text-grey-600"
                onClick={() => setValue("user_national_code", "")}
              >
                <Close />
              </button>
            ) : null
          }
          {...register("user_national_code", {
            required: "این فیلد اجباری است.",
          })}
        />
        <Input
          type="text"
          placeholder="کد پستی خود را وارد کنید"
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
          placeholder="آدرس خود را وارد کنید"
          label="آدرس"
          className="input input-bordered w-full"
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
        <Link
          to=".."
          type="button"
          className="btn btn-outline btn-secondary w-40"
        >
          انصراف
        </Link>
        <button
          className="btn btn-secondary w-40 disabled:bg-grey-200"
          disabled={!isDirty || !isValid}
        >
          {account_id ? "ثبت تغییرات" : "افزودن کاربر"}
        </button>
      </div>
    </form>
  );
}

export { CustomersCreateReal };
