import {
  postAccountAuthLoginOTP,
  postAccountAuthLoginPassword,
} from "@/api/account";
import { Input } from "@/components/input";
import { login_method, user_roles } from "@/model";
import { useAuthStore } from "@/store/auth";
import { usePersianConvert } from "@/utils/usePersianConvert";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, Hide, Show } from "react-iconly";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IAuthLoginPasswordProps {
  changeStep: (step: login_method) => void;
  phone: string;
}

interface IAuthLoginPasswordForm {
  phone: string;
  password: string;
}

function AuthLoginPassword({ changeStep, phone }: IAuthLoginPasswordProps) {
  const [isPassword, setIsPassword] = useState(true);

  const navigate = useNavigate();
  const { loginUser } = useAuthStore();
  const { convertPersian2English } = usePersianConvert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      phone,
    },
  });

  const sendOtp = useMutation(postAccountAuthLoginOTP, {
    onSuccess: () => {
      toast("کد با موفقیت ارسال شد.", {
        type: "success",
      });
      changeStep("otp");
    },
    onError: () => {
      toast("حساب کاربری یافت نشد.", {
        type: "error",
      });
    },
  });

  const handleSendOtp = () =>
    sendOtp.mutate({
      body: {
        phone_number: convertPersian2English(phone),
      },
    });

  const passwordLogin = useMutation(postAccountAuthLoginPassword, {
    onSuccess: (res) => {
      const { access_token, refresh_token, role } = res?.data as {
        access_token: string;
        refresh_token: string;
        role: user_roles;
      };
      loginUser(access_token, refresh_token, role);
      toast("خوش آمدید!", {
        type: "success",
      });
      navigate("/");
    },
    onError: (err: AxiosError) => {
      if (
        (err?.response?.data as Record<string, string>).non_field_errors &&
        err.status === 406
      ) {
        toast("حساب کاربری شما تایید نشده است.", {
          type: "error",
        });
      } else {
        toast("شماره موبایل یا رمز عبور اشتباه است.", {
          type: "error",
        });
      }
    },
  });

  const onSubmit = (values: IAuthLoginPasswordForm) =>
    passwordLogin.mutate({
      body: {
        phone_number: convertPersian2English(values.phone),
        password: convertPersian2English(values.password),
      },
    });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-start justify-center gap-y-4 border border-grey-200 rounded-custom p-5 h-full"
    >
      <h2 className="text-base xl:text-xl font-bold text-grey-800 flex items-center justify-between w-full">
        <span>ورود با رمز عبور</span>
        <button
          type="button"
          onClick={handleSendOtp}
          disabled={sendOtp.isLoading}
          className="btn btn-sm btn-link text-grey-800 decoration-transparent text-xs inline-flex xl:hidden"
        >
          دریافت کد فعالسازی
          <ArrowLeft size="small" />
        </button>
      </h2>
      <span className="text-sm xl:text-base text-grey-600">
        لطفا رمز عبور خود را وارد کنید
      </span>
      <Input
        type={isPassword ? "password" : "text"}
        className="input input-bordered w-full ltr text-end"
        label="رمز عبور"
        placeholder="رمز عبور را وارد کنید"
        error={errors.password}
        iconEnd={
          <button
            type="button"
            className="absolute end-4 inset-y-auto text-grey-600"
            onClick={() => setIsPassword((prevState) => !prevState)}
          >
            {isPassword ? <Show /> : <Hide />}
          </button>
        }
        {...register("password", {
          required: "رمز عبور خود را وارد کنید.",
          minLength: {
            value: 5,
            message: "رمز عبور بیشتر از ۵ کاراکتر است.",
          },
        })}
      />
      <button className="btn btn-primary btn-block mt-auto xl:mt-5">
        ورود با رمز عبور
      </button>

      <div className="w-full items-center justify-center gap-x-8 hidden xl:flex">
        <span className="text-[13px] font-light text-grey-600">ورود با</span>
        <button
          className="text-[13px] btn btn-ghost text-grey-800 font-bold"
          type="button"
          disabled={sendOtp.isLoading}
          onClick={handleSendOtp}
        >
          دریافت کد فعالسازی
        </button>
      </div>
    </form>
  );
}

export { AuthLoginPassword };
