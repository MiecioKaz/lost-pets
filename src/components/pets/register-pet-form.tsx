"use client";

import * as z from "zod";
import Image from "next/image";
import illustrGroup2 from "/public/illustr-group-2.jpg";
import illustrBalloons from "/public/illustr-balloons.jpg";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { PetPicture } from "./pet-picture";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterPetSchema } from "@/schemas";

import { registerPet } from "@/actions/register-pet";

export const RegisterPetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [compOpacity, setCompOpacity] = useState<boolean>(true);
  const [ownerPetId, setOwnerPetId] = useState("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterPetSchema>>({
    resolver: zodResolver(RegisterPetSchema),
    defaultValues: {
      status: "",
      breed: "",
      description: "",
      userName: "",
      phoneNumber: "",
      town: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof RegisterPetSchema>> = (data) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      registerPet(data).then((result) => {
        if (result.error) {
          setError(result.error);
          reset();
        } else {
          setOwnerPetId(result.id!);
          setSuccess(result.success);
          reset();
        }
      });
    });
  };
  return (
    <>
      <div className="flex justify-center flex-wrap gap-4">
        <div className="w-[300px] h-fit border rounded-lg bg-white py-4">
          <h1 className="text-center text-slate-600 font-bold mb-4">
            🐕 Dane zwierzaka i właściciela 🐈‍⬛
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 px-4 pb-6"
          >
            <div>
              <label className="font-semibold italic">Wybierz status</label>
              <select
                {...register("status")}
                className={`w-full h-9 border-2 rounded-lg px-2 ${
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
            </div>
            <div>
              <label className="font-semibold italic">Wybierz rasę</label>
              <select
                {...register("breed")}
                className={`w-full h-9 border-2 rounded-lg px-2 ${
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
            </div>
            <div>
              <label className="font-semibold italic">Opis zwierzaka</label>
              <textarea
                cols={30}
                rows={3}
                {...register("description")}
                className={`w-full border-2 rounded-lg px-2 ${
                  errors.description && "border-red-500 mb-2"
                } appearance-none focus:outline-none focus:shadow-outline`}
              ></textarea>
              {errors.description && (
                <p className="text-xs italic text-red-500 mb-2">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-semibold italic">Imię/Nazwisko</label>
              <input
                type="text"
                {...register("userName")}
                className={`w-full h-9 border-2 rounded-lg px-2 ${
                  errors.userName && "border-red-500 mb-2"
                } appearance-none focus:outline-none focus:shadow-outline`}
              />
              {errors.userName && (
                <p className="text-xs italic text-red-500 mb-2">
                  {errors.userName.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-semibold italic">Numer telefonu</label>
              <input
                type="text"
                {...register("phoneNumber")}
                className={`w-full h-9 border-2 rounded-lg px-2 ${
                  errors.phoneNumber && "border-red-500 mb-2"
                } appearance-none focus:outline-none focus:shadow-outline`}
              />
              {errors.phoneNumber && (
                <p className="text-xs italic text-red-500 mb-2">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-semibold italic">Miasto/Miejscowość</label>
              <input
                type="text"
                {...register("town")}
                className={`w-full h-9 border-2 rounded-lg px-2 ${
                  errors.town && "border-red-500 mb-2"
                } appearance-none focus:outline-none focus:shadow-outline`}
              />
              {errors.town && (
                <p className="text-xs italic text-red-500 mb-2">
                  {errors.town.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-semibold italic">{`Adres email (opcjonalny)`}</label>
              <input
                type="email"
                {...register("email")}
                className="w-full h-9 border-2 rounded-lg px-2"
              />
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />
            {!success && (
              <button
                type="submit"
                disabled={isPending}
                className="w-full h-9 border-2 rounded-lg mt-3 bg-black hover:bg-slate-500 text-white"
              >
                {isPending ? "Czekaj..." : "Zarejestruj dane"}
              </button>
            )}
          </form>
          {success && compOpacity && (
            <div className="w-full h-fit">
              <div className="flex justify-center gap-2">
                <h1 className="text-slate-600 text-center my-3">
                  Chcesz dodać zdjęcia?
                </h1>

                <button
                  onClick={() => setCompOpacity(false)}
                  className="text-green-600 font-bold hover:underline"
                >
                  Tak
                </button>
                <button
                  onClick={() => location.reload()}
                  className="text-red-600 font-bold hover:underline"
                >
                  Nie
                </button>
              </div>
            </div>
          )}
        </div>
        <div
          className={`w-[300px] h-fit mb-6 border rounded-lg bg-white ${
            compOpacity ? "opacity-15" : "opacity-100"
          } pt-4`}
        >
          <h1 className="text-center text-slate-600 font-bold">{`Dodaj zdjęcia (opcjonalnie)`}</h1>
          <Image
            src={illustrGroup2}
            style={{
              width: "100%",
              height: "auto",
            }}
            sizes="33vw"
            alt="vecteezy image"
            className="place-self-center"
          />
          <div>
            <PetPicture ownerPetId={ownerPetId} />
          </div>
          <Image
            src={illustrBalloons}
            style={{
              width: "90%",
              height: "auto",
            }}
            sizes="33vw"
            alt="vecteezy image"
            className="place-self-center mx-auto"
          />
        </div>
      </div>
    </>
  );
};
