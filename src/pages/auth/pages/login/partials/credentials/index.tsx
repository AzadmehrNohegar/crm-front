import { postAccountAuthLoginOTP } from "@/api/account";
import { Input } from "@/components/input";
import { MOBILE_FORMAT } from "@/constants";
import { loginMethod } from "@/model";
import { usePersianConvert } from "@/utils/usePersianConvert";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface IAuthLoginCredentialsProps {
  changeStep: (step: loginMethod) => void;
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
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
    },
  });

  const sendOtp = useMutation(postAccountAuthLoginOTP, {
    onSuccess: () => {
      toast("رمز یکبار مصرف با موفقیت ارسال شد.", {
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
      className="w-full flex flex-col items-start justify-center gap-y-4 border border-gray-200 rounded-[20px] p-5"
    >
      <h2 className="text-lg sm:text-xl font-bold text-grey-800">
        ورود به حساب کاربری
      </h2>
      <span className="text-base sm:text-base text-grey-600">
        لطفا اطلاعات حساب کاربری خود را وارد کنید
      </span>
      <Input
        type="text"
        className="input input-bordered w-full h-10 sm:h-12 ltr text-end"
        label="شماره موبایل"
        placeholder="شماره موبایل را وارد کنید"
        error={errors.phone}
        {...register("phone", {
          required: "شماره موبایل خود را وارد کنید.",
          pattern: {
            value: MOBILE_FORMAT,
            message: "شماره موبایل نادرست است.",
          },
        })}
      />
      <div className="flex items-center mt-28 justify-between w-full gap-x-4">
        <button
          type="button"
          className="btn btn-primary btn-outline basis-modified"
          onClick={handlePasswordLogin}
        >
          ورود با رمز عبور
        </button>
        <button
          type="submit"
          className="btn btn-primary basis-modified text-[13px] sm:text-base"
          disabled={sendOtp.isLoading}
        >
          دریافت کد فعالسازی
        </button>
      </div>
      <div className="w-full flex items-center justify-center gap-x-8">
        <span className="text-[13px] font-light text-gray-600">
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
