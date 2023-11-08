import { useState } from "react";
import { AuthRegisterJuridical } from "./partials/juridical";
import { AuthRegisterReal } from "./partials/real";
import { contract_types } from "@/model";
import { Link } from "react-router-dom";
import { ArrowLeft } from "react-iconly";

function AuthRegister() {
  const [type, setType] = useState<contract_types>("REAL");

  return (
    <main className="flex flex-col-reverse justify-between sm:justify-normal gap-y-4 sm:gap-y-0 sm:flex-row h-screen items-center p-2 sm:p-8 gap-x-8">
      <div className="w-full sm:w-5/12 h-full sm:h-fit max-h-[48vh] sm:max-h-fit">
        <div className="w-full flex flex-col items-start justify-center gap-y-2 border border-grey-200 rounded-custom p-5">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg sm:text-xl font-bold text-grey-800">
              تکمیل فرم درخواست حساب کاربری
            </h2>
            <Link
              to=".."
              className="btn btn-link btn-ghost text-grey-800 px-0 decoration-transparent"
            >
              <span className="hidden sm:inline">بازگشت به صفحه ورود</span>
              <span className="inline sm:hidden">بازگشت</span>
              <ArrowLeft />
            </Link>
          </div>
          <span className="text-base sm:text-base text-grey-600">
            با تکمیل اطلاعات زیر درخواست خود را ثبت کنید.
          </span>
          <div className="w-full flex items-center gap-x-2">
            <span className="text-sm inline-block me-auto">
              <span className="hidden sm:inline">
                نوع حساب کاربری خود را مشخص کنید.
              </span>
              <span className="inline sm:hidden">نوع حساب کاربری</span>
            </span>
            <label htmlFor="real">حقیقی</label>
            <input
              id="real"
              type="radio"
              className="radio radio-error"
              checked={type === "REAL"}
              onChange={() => setType("REAL")}
            />
            <label htmlFor="juridical">حقوقی</label>
            <input
              id="juridical"
              type="radio"
              className="radio radio-error"
              checked={type === "JURIDICAL"}
              onChange={() => setType("JURIDICAL")}
            />
          </div>
          {type === "JURIDICAL" ? <AuthRegisterJuridical /> : null}
          {type === "REAL" ? <AuthRegisterReal /> : null}
        </div>
      </div>
      <div className="w-full sm:w-7/12 h-full sm:h-auto max-h-[47vh] sm:max-h-full">
        <picture>
          <source media="(min-width:768px)" src="/images/auth-bg1.png" />
          <source media="(max-width:768px)" src="/images/auth-bg1-mobile.png" />
          <img
            src="/images/auth-bg1.png"
            className="max-h-[93vh] mx-0 sm:mx-auto w-full sm:w-fit h-full sm:h-full object-cover object-bottom rounded-t-2xl"
            alt="auth bg"
          />
        </picture>
      </div>
    </main>
  );
}

export default AuthRegister;
