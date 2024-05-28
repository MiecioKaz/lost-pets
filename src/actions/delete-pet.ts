"use server";

import prisma from "@/lib/db";
import { imageDelete } from "@/lib/cloudinary";

export const deletePet = async (id: string) => {
  try {
    const pet = await prisma.owner.delete({
      where: { id },
    });

    if (pet) {
      if (pet.picture[0].imgId !== "") {
        const firstImg = await imageDelete(pet.picture[0].imgId);

        if (firstImg.result === "ok" && pet.picture[1]) {
          const secongImg = await imageDelete(pet.picture[1].imgId);
          if (secongImg.result === "ok") {
            return { result: "ok" };
          } else {
            return { error: "Nie udało się usunąć zdjęć!" };
          }
        } else if (firstImg.result !== "ok") {
          return { error: "Nie udało się usunąć zdjęć!" };
        } else {
          return { result: "ok" };
        }
      } else {
        return { result: "ok" };
      }
    } else {
      return { error: "Nie udało się usunąć danych!" };
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
