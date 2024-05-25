"use client";

import type { Owner } from "../../../types/types";
import Image from "next/image";
import { deletePet } from "@/actions/delete-pet";
import { useState } from "react";

export const DeletePetsComp = ({ ownerPets }: { ownerPets: Owner[] }) => {
  const [isPending, setIsPending] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [error, setError] = useState("");

  const removePet = (ownerId: string, index: number) => {
    setSelectedIndex(index);
    setIsPending(true);

    deletePet(ownerId).then((res) => {
      if (res && res.result === "ok") {
        console.log(res.result);
        setIsPending(false);
        location.reload();
      } else if (res && res.error) {
        setError(res.error);
        setIsPending(false);
      } else {
        setError("Oops! Nie udało się!");
      }
    });
  };

  return (
    <>
      <h1 className="text-xl text-slate-700 text-center mb-10">
        Wykaz twoich, zarejestrowanych zwierzaków.
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {ownerPets.map((ownerPet, index) =>
          ownerPet.picture[0].imgUrl !== "" ? (
            <div
              key={ownerPet.id}
              className="relative w-72 sm:w-80 h-72 sm:h-80 border-2 rounded-md"
            >
              <Image
                src={ownerPet.picture[0].imgUrl}
                fill
                alt="Zdjęcie zwierzaka"
                sizes="33vw"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8LDqnHgAFjAIVesqNBwAAAABJRU5ErkJggg=="
                className="object-cover object-center rounded-md"
              />
              <div
                key={index}
                className="absolute top-2 left-2 w-fit h-fit p-1 border rounded-lg text-slate-700 hover:bg-amber-300 cursor-pointer bg-white"
                onClick={() => removePet(ownerPet.id, index)}
              >
                {index === selectedIndex && isPending && "Czekaj..."}
                {index !== selectedIndex && "Usuń"}
              </div>
              {error && index === selectedIndex && (
                <p className="absolute bottom-2 left-10 text-xl text-red-500">
                  {error}
                </p>
              )}
            </div>
          ) : (
            <>
              <div
                key={ownerPet.id}
                className="relative content-center text-center w-80 h-80 border-2 rounded-md text-red-800 text-xl"
              >
                <div
                  key={index}
                  className="absolute top-2 left-2 w-fit h-fit p-1 border rounded-lg text-slate-700 hover:bg-amber-300 cursor-pointer bg-white"
                  onClick={() => removePet(ownerPet.id, index)}
                >
                  {index === selectedIndex && isPending && "Czekaj..."}
                  {index !== selectedIndex && "Usuń"}
                </div>
                Nie dołączono zdjęcia🐾
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};
