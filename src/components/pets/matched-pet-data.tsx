"use client";

import { useState } from "react";
import type { Owner } from "../../../types/types";
import Image from "next/image";
import illustrDogHead from "/public/illustr-dog-2.jpg";

export const MatchedPetData = ({
  matchedPet,
  matchedPets,
  index,
}: {
  matchedPet: Owner;
  matchedPets: Owner[];
  index: number;
}) => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  const handleClick = (indx: number, id: string) => {
    if (matchedPets[indx].id === id) {
      setIsDisplayed(!isDisplayed);
    }
  };

  return (
    <div className="relative w-[300px] sm:w-[590px] h-fit border p-2">
      <div className="flex justify-center gap-2 mb-2">
        {matchedPet.picture.map((imgData, indx) => (
          <div
            key={indx}
            className="relative w-36 sm:w-72 h-36 sm:h-72 border rounded-lg"
          >
            {imgData.imgUrl !== "" ? (
              <Image
                src={imgData.imgUrl}
                fill
                alt="Zwierzak"
                sizes="33vw"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8LDqnHgAFjAIVesqNBwAAAABJRU5ErkJggg=="
                className="object-cover object-center rounded-lg"
              />
            ) : (
              <h1 className="text-center text-red-800 mt-16">
                Nie dołączono zdjęcia
              </h1>
            )}
          </div>
        ))}
      </div>
      <label className="text-fuchsia-900 font-bold italic">
        Opis zwierzaka
      </label>
      <div className="w-full h-20 border p-2 text-fuchsia-900 overflow-auto">
        {matchedPet.pet.description}
      </div>
      <div className="w-full h-fit text-center mt-2">
        <button
          onClick={() => handleClick(index, matchedPet.id)}
          className="border-2 rounded-xl text-slate-700 hover:bg-emerald-300 px-1"
        >
          Dane kontaktowe
        </button>
      </div>
      {isDisplayed && (
        <div
          className={`absolute left-0 -bottom-22 w-full h-fit flex justify-evenly py-3 border bg-neutral-800 text-white z-10`}
        >
          <div>
            <p className="italic">
              Imię/Nazwisko:{" "}
              <span className="font-bold not-italic">
                {matchedPet.userName}
              </span>
            </p>
            <p className="my-2 italic">
              Numer telefonu:{" "}
              <span className="font-bold not-italic">
                {matchedPet.phoneNumber}
              </span>
            </p>
            <p className="italic">
              Adres email:{" "}
              <span className="font-bold not-italic">
                {matchedPet.email ? matchedPet.email : `Nie dodano adresu`}
              </span>
            </p>
          </div>
          <Image
            src={illustrDogHead}
            style={{
              width: "10%",
              height: "auto",
            }}
            sizes="33vw"
            alt="vecteezy image"
            className="place-self-center rounded-full"
          />
        </div>
      )}
    </div>
  );
};
