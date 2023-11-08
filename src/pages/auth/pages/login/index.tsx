import { useState } from "react";
import { AuthLoginCredentials } from "./partials/credentials";
import { AuthLoginPassword } from "./partials/password";
import { AuthLoginOtp } from "./partials/otp";

function AuthLogin() {
  const [step, setStep] = useState<"credentials" | "otp" | "password">(
    "credentials"
  );
  const [persistedPhone, setPersistedPhone] = useState("");

  return (
    <main className="flex flex-col-reverse gap-y-4 sm:gap-y-0 sm:flex-row h-screen items-center p-2 sm:p-8 gap-x-8">
      <div className="w-full sm:w-5/12 h-full sm:h-fit">
        {step === "credentials" ? (
          <AuthLoginCredentials
            changeStep={(step) => setStep(step)}
            persistPhone={(val) => setPersistedPhone(val)}
          />
        ) : null}
        {step === "password" ? (
          <AuthLoginPassword
            changeStep={(step) => setStep(step)}
            phone={persistedPhone}
          />
        ) : null}
        {step === "otp" ? (
          <AuthLoginOtp
            resetFlow={() => setStep("credentials")}
            phone={persistedPhone}
          />
        ) : null}
      </div>
      <div className="w-full sm:w-7/12 h-full sm:h-auto max-h-[47vh] sm:max-h-full">
        <picture>
          <source media="(min-width:768px)" src="/images/auth-bg1.png" />
          <source media="(max-width:768px)" src="/images/auth-bg1-mobile.png" />
          <img
            src="/images/auth-bg1.png"
            className="max-h-[93vh] mx-0 sm:mx-auto w-full h-full sm:h-full object-cover object-bottom rounded-t-2xl"
            alt="auth bg"
          />
        </picture>
      </div>
    </main>
  );
}

export default AuthLogin;
