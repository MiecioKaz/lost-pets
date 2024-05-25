"use client";

import * as z from "zod";
import { FormError } from "../form-error";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { SearchPetSchema } from "@/schemas";
import { useRouter } from "next/navigation";

export const SearchPetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof SearchPetSchema>>({
    resolver: zodResolver(SearchPetSchema),
    defaultValues: {
      status: "",
      breed: "",
      town: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof SearchPetSchema>> = (values) => {
    setError("");

    const validatedFields = SearchPetSchema.safeParse(values);

    if (!validatedFields.success) {
      setError("Wprowadzono niewłaściwe dane!");
      return;
    }
    const { status, breed, town } = validatedFields.data;

    startTransition(() => {
      router.push(
        `/pets/display-pets?status=${status}&breed=${breed}&town=${town}`
      );
    });
  };

  return (
    <>
      <h1 className="text-sm sm:text-xl text-center text-slate-600 font-bold my-4">
        🐇 Parametry wyszukiwania 🦜
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-4 pb-4"
      >
        <label className="text-sm sm:text-base font-semibold italic">
          Status zwierzaka
        </label>
        <select
          {...register("status")}
          className={`w-full h-9 border-2 rounded-lg px-2 mb-4 ${
            errors.status && "border-red-500 mb-2"
          } focus:outline-none focus:shadow-outline`}
        >
          <option value=""></option>
          <option value="lost">Zagubiony Zwierzak</option>
          <option value="found">Znaleziony Zwierzak</option>
        </select>
        {errors.status && (
          <p className="text-xs italic text-red-500 mb-2">
            {errors.status.message}
          </p>
        )}
        <label className="text-sm sm:text-base font-semibold italic">
          Rasa zwierzaka
        </label>
        <select
          {...register("breed")}
          className={`w-full h-9 border-2 rounded-lg px-2 mb-4 ${
            errors.breed && "border-red-500 mb-2"
          } focus:outline-none focus:shadow-outline`}
        >
          <option value=""></option>
          <option value="dog">Pies</option>
          <option value="cat">Kot</option>
          <option value="other">Inny</option>
        </select>
        {errors.breed && (
          <p className="text-xs italic text-red-500 mb-2">
            {errors.breed.message}
          </p>
        )}
        <label className="text-sm sm:text-base font-semibold italic">
          Miasto/Miejscowość
        </label>
        <input
          type="text"
          {...register("town")}
          className={`w-full h-9 border-2 rounded-lg px-2 mb-4 ${
            errors.town && "border-red-500 mb-2"
          } appearance-none focus:outline-none focus:shadow-outline`}
        />
        {errors.town && (
          <p className="text-xs italic text-red-500 mb-2">
            {errors.town.message}
          </p>
        )}

        <FormError message={error} />
        <button
          type="submit"
          disabled={isPending}
          className="w-full h-9 border-2 rounded-lg mt-3 bg-black hover:bg-slate-500 text-white"
        >
          {isPending ? "Loading..." : "Szukaj"}
        </button>
      </form>
    </>
  );
};
