import { postAccountAuthLoginOTP } from "@/api/account";
import { Input } from "@/components/input";
import { MOBILE_FORMAT } from "@/constants";
import { login_method } from "@/model";
import { usePersianConvert } from "@/utils/usePersianConvert";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import clsx from "clsx";

interface IAuthLoginCredentialsProps {
  changeStep: (step: login_method) => void;
  persistPhone: (val: string) => void;
}

interface IAuthLoginCredentialsForm {
  phone: string;
}

function AuthLoginCredentials({
  changeStep,
  persistPhone,
}: IAuthLoginCredentialsProps) {
  const { convertPersian2English } = usePersianConvert();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: {
      phone: "",
    },
    mode: "all",
  });

  const sendOtp = useMutation(postAccountAuthLoginOTP, {
    onSuccess: () => {
      toast("کد با موفقیت ارسال شد.", {
        type: "success",
      });
      persistPhone(getValues().phone);
      changeStep("otp");
    },
    onError: () => {
      toast("حساب کاربری یافت نشد.", {
        type: "error",
      });
    },
  });

  const onSubmit = (values: IAuthLoginCredentialsForm) =>
    sendOtp.mutate({
      body: {
        phone_number: convertPersian2English(values.phone),
      },
    });

  const handlePasswordLogin = () => {
    persistPhone(getValues().phone);
    changeStep("password");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-start justify-center gap-y-4 border border-grey-200 rounded-custom p-5"
    >
      <h2 className="text-lg sm:text-xl font-bold text-grey-800">
        ورود به حساب کاربری
      </h2>
      <span className="text-base sm:text-base text-grey-600">
        لطفا اطلاعات حساب کاربری خود را وارد کنید
      </span>
      <Input
        type="text"
        className={clsx(
          "input input-bordered w-full ltr text-end",
          isValid && "border-success focus:outline-success-100",
          !isValid && isDirty && "border-danger focus:outline-danger-100"
        )}
        label="شماره موبایل"
        placeholder="شماره موبایل را وارد کنید"
        error={errors.phone}
        {...register("phone", {
          required: "شماره موبایل خود را وارد کنید.",
          validate: (value) =>
            (value.match(MOBILE_FORMAT) && value.length === 11) ||
            "شماره موبایل نادرست است.",
        })}
      />
      <div className="flex items-center mt-28 justify-between w-full gap-x-4">
        <button
          type="button"
          className="btn btn-primary btn-outline basis-modified"
          onClick={handlePasswordLogin}
          disabled={!isValid || !isDirty}
        >
          ورود با رمز عبور
        </button>
        <button
          type="submit"
          className="btn btn-primary basis-modified text-[13px] sm:text-base disabled:bg-grey-200"
          disabled={sendOtp.isLoading || !isValid || !isDirty}
        >
          دریافت کد فعالسازی
        </button>
      </div>
      <div className="w-full flex items-center justify-center gap-x-8">
        <span className="text-[13px] font-light text-grey-600">
          حساب کاربری دارید؟
        </span>
        <Link
          to="../register"
          className="text-[13px] btn btn-link text-grey-800 decoration-transparent font-bold"
        >
          ساخت حساب کاربری
        </Link>
      </div>
    </form>
  );
}

export { AuthLoginCredentials };
