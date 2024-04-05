"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "twitter") => {
    signIn(provider, { callbackUrl: callbackUrl || "/" });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <button
        onClick={() => onClick("google")}
        className="w-full border-2 rounded-sm py-1 hover:bg-slate-100"
      >
        <FcGoogle className="h-5 w-5 mx-auto" />
      </button>
      <button
        onClick={() => onClick("twitter")}
        className="w-full border-2 rounded-sm py-1 hover:bg-slate-100"
      >
        <FaXTwitter className="h-5 w-5 mx-auto" />
      </button>
    </div>
  );
};
