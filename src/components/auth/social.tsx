import { signIn } from "@/auth";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export const Social = ({ callbackUrl }: { callbackUrl: string }) => {
  const handleClick = async (provider: "google" | "twitter") => {
    "use server";

    await signIn(provider, { redirectTo: callbackUrl || "/" });
  };

  return (
    <div className="flex items-center w-full gap-x-2 mb-4">
      <form
        className="w-full"
        action={async () => {
          "use server";
          await handleClick("google");
        }}
      >
        <button
          type="submit"
          className="w-full border-2 rounded-sm py-1 hover:bg-slate-100"
        >
          <FcGoogle className="h-5 w-5 mx-auto" />
        </button>
      </form>

      <form
        className="w-full"
        action={async () => {
          "use server";
          await handleClick("twitter");
        }}
      >
        <button
          type="submit"
          className="w-full border-2 rounded-sm py-1 hover:bg-slate-100"
        >
          <FaXTwitter className="h-5 w-5 mx-auto" />
        </button>
      </form>
    </div>
  );
};
