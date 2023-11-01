import { AuthResultSuccess } from "./partials/success";

function AuthResult() {
  return (
    <main className="flex h-screen items-center p-8 gap-x-8">
      <div className="w-5/12">
        <AuthResultSuccess />
      </div>
      <div className="w-7/12">
        <img
          src="/images/register-success-bg.png"
          className="max-h-[95vh] mx-auto"
          alt="auth bg"
        />
      </div>
    </main>
  );
}

export default AuthResult;
