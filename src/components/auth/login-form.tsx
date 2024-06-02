"use client";

import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { LoginSchema } from "@/schemas";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const calbackUrl = searchParams.get("callbackUrl");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = (data) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(data, calbackUrl)
        .then((result) => {
          if (result?.error) {
            reset({ email: "", password: "" });
            setError(result.error);
          } else {
            reset({ email: "", password: "" });
            setSuccess("Zalogowałeś się pomyślnie!");
          }
        })
        .catch(() => setError("Oops! Coś poszło nie tak!"));
    });
  };

  return (
    <div className=" px-4">
      <div className="text-center my-6">
        <h1 className="text-2xl font-extrabold">🔐 Auth</h1>
        <p className="text-muted-foreground text-sm mt-4">Witaj ponownie</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
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
        <Link
          href="/auth/reset"
          className="underline hover:text-amber-700 mb-3"
        >
          Zapomniałeś hasła?
        </Link>
        <FormError message={error} />
        <FormSuccess message={success} />
        <button
          type="submit"
          disabled={isPending}
          className="w-full h-9 border-2 rounded-lg mb-6 mt-3 bg-black hover:bg-slate-500 text-white"
        >
          {isPending ? "Loading..." : "Zaloguj"}
        </button>
      </form>
    </div>
  );
};
