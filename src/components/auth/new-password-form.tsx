"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { newPassword } from "@/actions/new-password";
import Link from "next/link";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        reset();
      });
    });
  };
  return (
    <>
      <div className="text-center my-6">
        <h1 className="text-2xl font-extrabold">🔐 Auth</h1>
        <p className="text-muted-foreground text-sm mt-4">
          {success && "Sukces!"}
          {error && "Wystąpił błąd!"}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-4 pb-4"
      >
        <label className="font-bold">Hasło</label>
        <input
          {...register("password")}
          type="password"
          placeholder="********"
          className={`w-full h-9 border-2 rounded-lg px-2 mb-4 mt-1 ${
            errors.password && "border-red-500 mb-2"
          } appearance-none focus:outline-none focus:shadow-outline`}
        />
        {errors.password && (
          <p className="text-xs italic text-red-500 mb-2">
            {errors.password.message}
          </p>
        )}
        <FormError message={error} />
        <FormSuccess message={success} />
        {!success && !error && (
          <button
            type="submit"
            disabled={isPending}
            className="w-full h-9 border-2 rounded-lg mb-6 mt-3 bg-black hover:bg-slate-500 text-white"
          >
            {isPending ? "Czekaj..." : "Zresetuj hasło"}
          </button>
        )}
        <Link
          href="/auth/login"
          className="underline text-center hover:text-amber-700 mt-6"
        >
          Powrót do logowania
        </Link>
      </form>
    </>
  );
};
