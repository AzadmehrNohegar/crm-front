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
    <main className="flex flex-col-reverse gap-y-4 xl:gap-y-0 xl:flex-row h-screen items-center p-2 xl:p-8 gap-x-8">
      <div className="w-full xl:w-5/12 h-full xl:h-fit">
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
            changeStep={(step) => setStep(step)}
            phone={persistedPhone}
          />
        ) : null}
      </div>
      <div className="w-full xl:w-7/12 h-full xl:h-auto max-h-[47vh] xl:max-h-full">
        <picture>
          <source media="(min-width:1280px)" src="/images/auth-bg1.png" />
          <source
            media="(max-width:1280px)"
            src="/images/auth-bg1-mobile.png"
          />
          <img
            src="/images/auth-bg1.png"
            className="max-h-[93vh] mx-0 xl:mx-auto w-full h-full xl:h-full object-cover object-bottom rounded-t-2xl"
            alt="auth bg"
          />
        </picture>
      </div>
    </main>
  );
}

export default AuthLogin;
