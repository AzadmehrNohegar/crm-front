import { postAccountAuthRegistration } from "@/api/account";
import { Close } from "@/assets/icons/Close";
import { Input } from "@/components/input";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IAuthRegisterRealForm {
  first_name: string;
  last_name: string;
  user_national_code: string;
  phone_number: string;
  postal_code: string;
  address: string;
}

function AuthRegisterReal() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { dirtyFields, errors, isDirty, isValid },
  } = useForm<IAuthRegisterRealForm>({
    defaultValues: {
      first_name: "",
      last_name: "",
      user_national_code: "",
      phone_number: "",
      postal_code: "",
      address: "",
    },
  });

  const createRealAccount = useMutation(postAccountAuthRegistration, {
    onSuccess: () => {
      navigate("../result?status=success");
    },
    onError: (err: AxiosError) => {
      if ((err?.response?.data as Record<string, string>).user_national_code)
        toast("حساب کاربری با این شماره ملی وجود دارد.", {
          type: "error",
        });
    },
  });

  const onSubmit = (values: IAuthRegisterRealForm) =>
    createRealAccount.mutate({
      body: {
        user_type: "REAL",
        ...values,
      },
    });

  return (
    <form
      className="w-full flex flex-col gap-y-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="text"
        placeholder="نام را وارد کنید"
        label="نام"
        className="input input-bordered w-full"
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
      <button
        className="btn btn-block btn-primary disabled:bg-grey-200 mt-4"
        disabled={!isValid || !isDirty}
      >
        ثبت درخواست
      </button>
    </form>
  );
}

export { AuthRegisterReal };
