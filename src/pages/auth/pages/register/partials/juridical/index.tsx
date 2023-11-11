import { postAccountAuthRegistration } from "@/api/account";
import { Close } from "@/assets/icons/Close";
import { Input } from "@/components/input";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IAuthRegisterJuridicalForm {
  company_economic_code: string;
  company_national_id: string;
  company_name: string;
  phone_number: string;
  postal_code: string;
  address: string;
}

function AuthRegisterJuridical() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { dirtyFields, errors, isValid, isDirty },
  } = useForm<IAuthRegisterJuridicalForm>({
    defaultValues: {
      company_economic_code: "",
      company_national_id: "",
      company_name: "",
      phone_number: "",
      postal_code: "",
      address: "",
    },
  });

  const createJuridicalAccount = useMutation(postAccountAuthRegistration, {
    onSuccess: () => {
      navigate("../result?status=success");
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

  const onSubmit = (values: IAuthRegisterJuridicalForm) =>
    createJuridicalAccount.mutate({
      body: {
        user_type: "JURIDICAL",
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
        placeholder="نام شرکت را وارد کنید"
        label="نام شرکت"
        className="input input-bordered w-full"
        error={errors.company_name}
        iconEnd={
          dirtyFields.company_name ? (
            <button
              type="button"
              className="absolute end-4 inset-y-auto text-grey-600"
              onClick={() => setValue("company_name", "")}
            >
              <Close />
            </button>
          ) : null
        }
        {...register("company_name", {
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
        placeholder="کد اقتصادی را وارد کنید"
        label="کد اقتصادی"
        className="input input-bordered w-full"
        error={errors.company_economic_code}
        iconEnd={
          dirtyFields.company_economic_code ? (
            <button
              type="button"
              className="absolute end-4 inset-y-auto text-grey-600"
              onClick={() => setValue("company_economic_code", "")}
            >
              <Close />
            </button>
          ) : null
        }
        {...register("company_economic_code", {
          required: "این فیلد اجباری است.",
        })}
      />

      <Input
        type="text"
        placeholder="شناسه ملی را وارد کنید"
        label="شناسه ملی"
        className="input input-bordered w-full"
        error={errors.company_national_id}
        iconEnd={
          dirtyFields.company_national_id ? (
            <button
              type="button"
              className="absolute end-4 inset-y-auto text-grey-600"
              onClick={() => setValue("company_national_id", "")}
            >
              <Close />
            </button>
          ) : null
        }
        {...register("company_national_id", {
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
        className="btn btn-block btn-primary mt-4 disabled:bg-grey-200"
        disabled={!isValid || !isDirty}
      >
        ثبت درخواست
      </button>
    </form>
  );
}

export { AuthRegisterJuridical };
