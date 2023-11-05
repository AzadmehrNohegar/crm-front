import {
  postAccountAuthCheckOTP,
  postAccountAuthLoginOTP,
} from "@/api/account";
import { RadialProgress } from "@/components/radialProgress";
import { user_roles } from "@/model";
import { OtpInput } from "@/shared/otpInput";
import { useAuthStore } from "@/store/auth";
import { usePersianConvert } from "@/utils/usePersianConvert";
import { FormEvent, useState } from "react";
import { Edit } from "react-iconly";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCountdown, useEffectOnce } from "usehooks-ts";

interface IAuthLoginOtpProps {
  resetFlow: () => void;
  phone: string;
}

function AuthLoginOtp({ resetFlow, phone }: IAuthLoginOtpProps) {
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
      navigate("/");
    },
    onError: () => {
      toast("کد اشتباه است.", {
        type: "error",
      });
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
      className="w-full flex flex-col items-start justify-center gap-y-4 border border-grey-200 rounded-custom p-5 h-full"
    >
      <h2 className="text-lg sm:text-xl font-bold text-grey-800">
        کد فعالسازی رو وارد کنید.
      </h2>
      <div className="flex items-center justify-between w-full">
        <span className="text-base sm:text-base text-grey-600">
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
      <button className="btn btn-block btn-primary mt-auto sm:mt-10">
        ورود به حساب کاربری
      </button>
    </form>
  );
}

export { AuthLoginOtp };
