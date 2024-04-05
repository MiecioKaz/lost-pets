"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { registerUser } from "@/actions/register";
import Link from "next/link";
import { Social } from "./social";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, reset } = useForm<
    z.infer<typeof RegisterSchema>
  >({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = (data) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      registerUser(data).then((result) => {
        setError(result.error);
        setSuccess(result.success);
        reset();
      });
    });
  };

  return (
    <>
      <div className="text-center my-6">
        <h1 className="text-2xl font-extrabold">🔐 Auth</h1>
        <p className="text-muted-foreground text-sm mt-4">Utwórz konto</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-4 pb-4"
      >
        <label className="font-bold">Imię/Nazwisko</label>
        <input
          {...register("name")}
          placeholder="Jan Kowalski"
          className="w-full h-9 border-2 rounded-lg px-2 mb-4 mt-1"
        />
        <label className="font-bold">Email</label>
        <input
          {...register("email")}
          placeholder="jan_kowalski@gmail.com"
          className="w-full h-9 border-2 rounded-lg px-2 mb-4 mt-1"
        />
        <label className="font-bold">Hasło</label>
        <input
          {...register("password")}
          placeholder="********"
          className="w-full h-9 border-2 rounded-lg px-2 mb-4 mt-1"
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <button
          type="submit"
          disabled={isPending}
          className="w-full h-9 border-2 rounded-lg mb-6 mt-3 bg-black hover:bg-slate-500 text-white"
        >
          {isPending ? "Loading..." : "Utwórz konto"}
        </button>
        <Social />
        <Link
          href="/auth/login"
          className="underline text-center hover:text-amber-700 mt-6"
        >
          Masz już konto?
        </Link>
      </form>
    </>
  );
};
