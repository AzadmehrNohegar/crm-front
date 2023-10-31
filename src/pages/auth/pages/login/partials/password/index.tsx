import { postAccountAuthLoginPassword } from "@/api/account";
import { Input } from "@/components/input";
import { login_method, user_roles } from "@/model";
import { useAuthStore } from "@/store/auth";
import { usePersianConvert } from "@/utils/usePersianConvert";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Show } from "react-iconly";
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

  const passwordLogin = useMutation(postAccountAuthLoginPassword, {
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
      toast("شماره موبایل یا رمز عبور اشتباه است.", {
        type: "error",
      });
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
      className="w-full flex flex-col items-start justify-center gap-y-4 border border-grey-200 rounded-custom p-5"
    >
      <h2 className="text-base sm:text-xl font-bold text-grey-800">
        ورود با رمز عبور
      </h2>
      <span className="text-sm sm:text-base text-grey-600">
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
            <Show />
          </button>
        }
        {...register("password", {
          required: "رمز عبور خود را وارد کنید.",
          min: {
            value: 6,
            message: "رمز عبور بیشتر از ۵ کاراکتر است.",
          },
        })}
      />
      <button className="btn btn-primary btn-block mt-5">
        ورود با رمز عبور
      </button>

      <div className="w-full flex items-center justify-center gap-x-8">
        <span className="text-[13px] font-light text-grey-600">ورود با</span>
        <button
          className="text-[13px] btn btn-ghost text-grey-800 font-bold"
          onClick={() => changeStep("otp")}
        >
          دریافت کد فعالسازی
        </button>
      </div>
    </form>
  );
}

export { AuthLoginPassword };
