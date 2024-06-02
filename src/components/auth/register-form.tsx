"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { registerUser } from "@/actions/register";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
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
    <div className=" px-4 pb-4">
      <div className="text-center my-6">
        <h1 className="text-2xl font-extrabold">🔐 Auth</h1>
        <p className="text-muted-foreground text-sm mt-4">Utwórz konto</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <label className="font-bold">Imię/Nazwisko</label>
        <input
          {...register("name")}
          placeholder="Jan Kowalski"
          className={`w-full h-9 border-2 rounded-lg px-2 mb-4 mt-1 ${
            errors.name && "border-red-500 mb-2"
          } appearance-none focus:outline-none focus:shadow-outline`}
        />
        {errors.name && (
          <p className="text-xs italic text-red-500 mb-2">
            {errors.name.message}
          </p>
        )}
        <label className="font-bold">Email</label>
        <input
          {...register("email")}
          placeholder="jan_kowalski@gmail.com"
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
        <button
          type="submit"
          disabled={isPending}
          className="w-full h-9 border-2 rounded-lg mb-6 mt-3 bg-black hover:bg-slate-500 text-white"
        >
          {isPending ? "Loading..." : "Utwórz konto"}
        </button>
      </form>
    </div>
  );
};
