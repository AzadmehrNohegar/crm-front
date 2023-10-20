import { useState } from "react";
import { AuthRegisterJuridical } from "./partials/juridical";
import { AuthRegisterReal } from "./partials/real";

function AuthRegister() {
  const [type, setType] = useState<"real" | "juridical">("real");

  return (
    <main className="flex h-screen items-center p-8 gap-x-6">
      <div className="w-5/12">
        <div className="w-full flex flex-col items-start justify-center gap-y-4 border border-gray-200 rounded-[20px] p-5">
          <h2 className="text-lg sm:text-xl font-bold text-grey-800">
            تکمیل فرم درخواست حساب کاربری
          </h2>
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
              checked={type === "real"}
              onChange={() => setType("real")}
            />
            <label htmlFor="juridical">حقوقی</label>
            <input
              id="juridical"
              type="radio"
              className="radio radio-error"
              checked={type === "juridical"}
              onChange={() => setType("juridical")}
            />
          </div>
          {type === "juridical" ? <AuthRegisterJuridical /> : null}
          {type === "real" ? <AuthRegisterReal /> : null}
        </div>
      </div>
      <div className="w-7/12 py-6">
        <img src="/images/auth-bg1.png" alt="auth bg" />
      </div>
    </main>
  );
}

export default AuthRegister;
