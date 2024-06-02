import { LoginForm } from "@/components/auth/login-form";
import { Social } from "@/components/auth/social";
import Link from "next/link";

const LoginPage = ({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) => {
  const { callbackUrl } = searchParams;

  return (
    <div className="w-[300px] sm:w-[400px] h-fit mt-24 border rounded-lg bg-white">
      <LoginForm />
      <div className="w-full text-center px-4 pb-4">
        <Social callbackUrl={callbackUrl} />
        <Link
          href="/auth/register"
          className="underline hover:text-amber-700"
        >
          Nie masz konta?
        </Link>
      </div>
    </div>
  );
};
export default LoginPage;
