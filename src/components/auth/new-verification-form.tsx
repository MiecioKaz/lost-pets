"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import Link from "next/link";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  console.log("components/auth/new-verification-form", token);

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Brakuje identyfikatora!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Oops! Coś poszło nie tak!");
      });
  }, [token, success, error]);

  const hasLoadedBefore = useRef(true);

  useEffect(() => {
    if (hasLoadedBefore.current) {
      onSubmit();
      hasLoadedBefore.current = false;
    }
  }, [onSubmit]);

  return (
    <>
      <div className="text-center my-6">
        <h1 className="text-2xl font-extrabold">🔐 Auth</h1>
        <p className="text-muted-foreground text-sm mt-4">
          {success && "Sukces!"}
          {error && "Wystąpił błąd!"}
        </p>
      </div>
      <div className="flex flex-col px-4 pb-4">
        <FormSuccess message={success} />
        <FormError message={error} />
        <Link href={!success ? "/auth/register" : "/auth/login"}>
          <div className="w-full border-2 rounded-lg mt-3 py-2 text-center bg-black hover:bg-slate-500 text-white">
            {success && "Przejdź do logowania"}
            {error && "Spróbuj ponownie"}
          </div>
        </Link>
      </div>
    </>
  );
};
