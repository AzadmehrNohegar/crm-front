import { AuthResultSuccess } from "./partials/success";

function AuthResult() {
  return (
    <main className="flex flex-col-reverse justify-center sm:justify-normal gap-y-4 sm:gap-y-0 sm:flex-row h-screen items-center p-2 sm:p-8 gap-x-8">
      <div className="w-full sm:w-5/12 h-full max-h-[48vh]">
        <AuthResultSuccess />
      </div>
      <div className="w-full hidden sm:block sm:w-7/12">
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
