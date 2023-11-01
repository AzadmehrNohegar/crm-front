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
    <main className="flex h-screen items-center p-8 gap-x-8">
      <div className="w-5/12">
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

export default AuthLogin;
