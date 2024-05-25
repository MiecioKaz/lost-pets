"use server";

import { db } from "@/lib/db";

type Picture = {
  imgUrl: string;
  imgId: string;
};

export const registerPicture = async (
  petImgData: Picture[],
  ownerPetId: string
) => {
  const updatedOwner = await db.owner.update({
    where: {
      id: ownerPetId,
    },
    data: {
      picture: petImgData,
    },
  });
  if (updatedOwner) {
    return { success: "Zdjęcia dodano pomyślnie" };
  } else {
    return { error: "Oops! Nie udało się!" };
  }
};
