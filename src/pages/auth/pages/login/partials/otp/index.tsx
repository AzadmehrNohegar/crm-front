import {
  postAccountAuthCheckOTP,
  postAccountAuthLoginOTP,
} from "@/api/account";
import { RadialProgress } from "@/components/radialProgress";
import { login_method, user_roles } from "@/model";
import { OtpInput } from "@/shared/otpInput";
import { useAuthStore } from "@/store/auth";
import { usePersianConvert } from "@/utils/usePersianConvert";
import { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { ArrowLeft, Edit } from "react-iconly";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCountdown, useEffectOnce } from "usehooks-ts";

interface IAuthLoginOtpProps {
  resetFlow: () => void;
  changeStep: (step: login_method) => void;
  phone: string;
}

function AuthLoginOtp({ resetFlow, changeStep, phone }: IAuthLoginOtpProps) {
  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState(false);

  const { loginUser } = useAuthStore();
  const navigate = useNavigate();

  const { convertPersian2English } = usePersianConvert();

  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 60,
    intervalMs: 1000,
    countStop: 0,
  });

  const resendOtp = useMutation(postAccountAuthLoginOTP, {
    onSuccess: () => {
      toast("کد با موفقیت ارسال شد.", {
        type: "success",
      });
      resetCountdown();
      startCountdown();
    },
  });

  const verifyOtp = useMutation(postAccountAuthCheckOTP, {
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
        toast("کد اشتباه است.", {
          type: "error",
        });
      }
    },
  });

  useEffectOnce(() => {
    startCountdown();
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    verifyOtp.mutate({
      body: {
        phone_number: convertPersian2English(phone),
        otp: convertPersian2English(otpValue),
      },
    });
  };

  const handleResend = () =>
    resendOtp.mutate({
      body: {
        phone_number: convertPersian2English(phone),
      },
    });

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col items-start justify-center gap-y-3 border border-grey-200 rounded-custom p-5 h-full"
    >
      <h2 className="text-base xl:text-xl font-bold text-grey-800 flex items-center justify-between w-full">
        <span>کد فعالسازی رو وارد کنید.</span>
        <button
          type="button"
          onClick={() => changeStep("password")}
          className="btn btn-sm btn-link text-grey-800 decoration-transparent text-xs inline-flex xl:hidden"
        >
          ورود با رمز عبور
          <ArrowLeft size="small" />
        </button>
      </h2>
      <div className="flex items-center justify-between w-full">
        <span className="text-base xl:text-base text-grey-600">
          کد ۵ رقمی به شماره <span className="bidi-override ltr">{phone}</span>{" "}
          ارسال شد.
        </span>
        <button
          type="button"
          className="btn btn-link btn-ghost text-info text-sm decoration-transparent"
          onClick={resetFlow}
        >
          <Edit />
          ویرایش شماره
        </button>
      </div>
      <OtpInput
        error={false}
        valueLength={5}
        value={otpValue}
        handleChange={(value) => {
          if (error) setError(false);
          setOtpValue(value);
        }}
      />
      <div className="flex items-center justify-between w-full">
        <div className="flex items-start flex-col gap-y-4">
          <span className="text-xs text-grey-500">لطفا منتظر بمونید</span>
          {count > 0 ? (
            <span className="text-sm text-grey-600">
              کد فعالسازی در حال ارسال است.
            </span>
          ) : null}
          {count === 0 ? (
            <button
              type="button"
              className="p-0 text-grey-600 font-bold text-sm"
              onClick={handleResend}
            >
              درخواست مجدد کد فعالسازی
            </button>
          ) : null}
        </div>
        <RadialProgress max={60} progress={count} />
      </div>
      <button className="btn btn-block btn-primary mt-auto xl:mt-10">
        ورود به حساب کاربری
      </button>
      <div className="w-full hidden xl:flex items-center justify-center gap-x-8">
        <span className="text-[13px] font-light text-grey-600">ورود با</span>
        <button
          className="text-[13px] btn btn-ghost text-grey-800 font-bold"
          onClick={() => changeStep("password")}
        >
          ورود با رمز عبور
        </button>
      </div>
    </form>
  );
}

export { AuthLoginOtp };
