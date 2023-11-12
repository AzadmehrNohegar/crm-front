import { AuthResultSuccess } from "./partials/success";

function AuthResult() {
  return (
    <main className="flex flex-col-reverse justify-center xl:justify-normal gap-y-4 xl:gap-y-0 xl:flex-row h-screen items-center p-2 xl:p-8 gap-x-8">
      <div className="w-full xl:w-5/12 h-full max-h-[48vh]">
        <AuthResultSuccess />
      </div>
      <div className="w-full hidden xl:block xl:w-7/12">
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
