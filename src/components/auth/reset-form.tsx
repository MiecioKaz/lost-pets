"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schemas";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { resetPassword } from "@/actions/reset";
import Link from "next/link";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      resetPassword(values).then((data) => {
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
        <p className="text-muted-foreground text-sm mt-4">Zapomniałeś hasła?</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-4 pb-4"
      >
        <label className="font-bold">Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="Jan_Kowalski@gmail.com"
          className={`w-full h-9 border-2 rounded-lg px-2 mb-4 mt-1 ${
            errors.email && "border-red-500 mb-2"
          } appearance-none focus:outline-none focus:shadow-outline`}
        />
        {errors.email && (
          <p className="text-xs italic text-red-500 mb-2">
            {errors.email.message}
          </p>
        )}
        <FormError message={error} />
        <FormSuccess message={success} />
        <button
          type="submit"
          disabled={isPending}
          className="w-full h-9 border-2 rounded-lg mb-6 mt-3 bg-black hover:bg-slate-500 text-white"
        >
          {isPending ? "Czekaj..." : "Wyślij email"}
        </button>
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
