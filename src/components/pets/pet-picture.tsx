"use client";

import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { imageUpload } from "@/lib/cloudinary";
import { registerPicture } from "@/actions/register-picture";

export const PetPicture = ({ ownerPetId }: { ownerPetId: string }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const [pictureNames, setPictureNames] = useState<string[]>([]);
  const [petImgData, setPetImgData] = useState<
    { imgUrl: string; imgId: string }[]
  >([]);
  const [isPending, startTransition] = useTransition();

  const MAX_FILE_SIZE = 3000000;
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setLoading(true);

    if (!ownerPetId) {
      setError("Wprowadź dane zwierzaka i właściciela");
      setLoading(false);
      return;
    }
    if (!event.target.files) {
      setError("Oops! Spróbuj ponownie.");
      setLoading(false);
      return;
    }

    const picture = event.target.files[0];

    if (!ACCEPTED_IMAGE_TYPES.includes(picture.type)) {
      setError("Tylko pliki: .jpg, .jpeg, .png i .webp");
      setLoading(false);
      return;
    }
    if (picture.size > MAX_FILE_SIZE) {
      setError("Maksymalny rozmiar pliku: 3MB!");
      setLoading(false);
      return;
    }
    setPictureNames([...pictureNames, picture.name]);

    imageUpload(picture).then((imgData) => {
      if (imgData.error) {
        setError(imgData.error.message);
      } else {
        const { secure_url, public_id } = imgData;
        setPetImgData([
          ...petImgData,
          { imgUrl: secure_url, imgId: public_id },
        ]);
        setLoading(false);
      }
    });
  };

  const uploadPicture = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (petImgData.length === 0) {
      return { error: "Nie dodano żadnego zdjęcia" };
    }
    startTransition(() => {
      registerPicture(petImgData, ownerPetId).then((response) => {
        if (response.success) {
          setSuccess(response.success);
          setPictureNames([]);
        }
        if (response.error) {
          setError(response.error);
          setPictureNames([]);
        }
      });
    });
  };

  return (
    <>
      <form
        className="flex flex-col px-4 pb-4"
        onSubmit={uploadPicture}
      >
        {!success && (
          <>
            <label
              className={`font-semibold italic ${
                pictureNames.length === 2 && !loading
                  ? "opacity-15"
                  : "opacity-100"
              }`}
            >
              Wybierz zdjęcia
            </label>
            <label
              htmlFor="image"
              className={`w-full h-9 p-1 text-sm border-2 border-double border-teal-500 rounded-lg px-2 mb-2 ${
                pictureNames.length === 2 && !loading
                  ? "opacity-15 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }`}
            >
              {loading ? "Czekaj..." : "Wybierz pojedynczo max. 2 zdjęcia"}
            </label>
            <input
              onChange={handleChange}
              type="file"
              id="image"
              className="hidden"
              disabled={pictureNames.length === 2}
            />
            <ol>
              {pictureNames.map((name, index) => (
                <li
                  key={index}
                  className="font-bold"
                >{`${index + 1}. ${name}`}</li>
              ))}
            </ol>
          </>
        )}

        <FormError message={error} />
        <FormSuccess message={success} />
        {!success && (
          <button
            type="submit"
            disabled={isPending || petImgData.length < 1}
            className={`w-full h-9 border-2 rounded-lg mt-5 bg-black ${
              petImgData.length < 1
                ? "opacity-15 cursor-not-allowed"
                : "opacity-100 cursor-pointer hover:bg-slate-500"
            } text-white`}
          >
            {isPending ? "Czekaj....." : "Zatwierdź wybrane 1 lub 2 zdjęcia"}
          </button>
        )}
      </form>
      {success && (
        <button
          onClick={() => location.reload()}
          className="w-full h-12 border-2 rounded-lg mt-5 bg-green-800 hover:bg-green-400 text-white"
        >
          Zakończ rejestrację
        </button>
      )}
    </>
  );
};
