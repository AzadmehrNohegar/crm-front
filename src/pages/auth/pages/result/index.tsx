import { useSearchParams } from "react-router-dom";
import { AuthResultSuccess } from "./partials/success";

function AuthResult() {
  const [searchParams] = useSearchParams();

  console.log(searchParams.get("status"));

  return (
    <main className="flex h-screen items-center p-8 gap-x-6">
      <div className="w-5/12">
        <AuthResultSuccess />
      </div>
      <div className="w-7/12 py-6">
        <img src="/images/register-success-bg.png" alt="auth bg" />
      </div>
    </main>
  );
}

export default AuthResult;
