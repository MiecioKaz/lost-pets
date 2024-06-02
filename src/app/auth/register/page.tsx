import { RegisterForm } from "@/components/auth/register-form";
import { Social } from "@/components/auth/social";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="w-[300px] sm:w-[400px] h-fit mt-28 sm:mt-0 border rounded-lg bg-white">
      <RegisterForm />
      <div className="w-full text-center px-4 pb-4">
        <Social callbackUrl="" />
        <Link
          href="/auth/login"
          className="underline hover:text-amber-700"
        >
          Masz już konto?
        </Link>
      </div>
    </div>
  );
};
export default RegisterPage;
