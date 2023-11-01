import { useState } from "react";
import { AuthRegisterJuridical } from "./partials/juridical";
import { AuthRegisterReal } from "./partials/real";
import { contract_types } from "@/model";
import { Link } from "react-router-dom";
import { ArrowLeft } from "react-iconly";

function AuthRegister() {
  const [type, setType] = useState<contract_types>("REAL");

  return (
    <main className="flex h-screen items-center p-8 gap-x-8">
      <div className="w-5/12">
        <div className="w-full flex flex-col items-start justify-center gap-y-2 border border-grey-200 rounded-custom p-5">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg sm:text-xl font-bold text-grey-800">
              تکمیل فرم درخواست حساب کاربری
            </h2>
            <Link
              to=".."
              className="btn btn-link btn-ghost text-grey-800 px-0 decoration-transparent"
            >
              بازگشت به صفحه ورود
              <ArrowLeft />
            </Link>
          </div>
          <span className="text-base sm:text-base text-grey-600">
            با تکمیل اطلاعات زیر درخواست خود را ثبت کنید.
          </span>
          <div className="w-full flex items-center gap-x-2">
            <span className="text-sm inline-block me-auto">
              نوع حساب کاربری خود را مشخص کنید.
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
      <div className="w-7/12">
        <img
          src="/images/auth-bg1.png"
          className="max-h-[95vh] mx-auto"
          alt="auth bg"
        />
      </div>
    </main>
  );
}

export default AuthRegister;
