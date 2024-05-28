"use server";

import * as z from "zod";
import prisma from "@/lib/db";
import { RegisterPetSchema } from "@/schemas";
import { auth } from "auth";

export const registerPet = async (
  values: z.infer<typeof RegisterPetSchema>
) => {
  const validatedFields = RegisterPetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Wprowadzono niewłaściwe dane!" };
  }

  const { status, breed, description, userName, phoneNumber, town, email } =
    validatedFields.data;

  const session = await auth();
  if (!session || !session.user) {
    return { error: "Nie jesteś zalogowany" };
  }

  const userId = session.user.id;
  if (!userId) {
    return { error: "Nie jesteś zalogowany" };
  }

  const owner = await prisma.owner.create({
    data: {
      userName,
      userId,
      phoneNumber,
      town,
      email,
      pet: {
        status,
        breed,
        description,
      },
      picture: [{ imgUrl: "", imgId: "" }],
    },
  });

  if (owner) {
    return { id: owner.id, success: "Dane zarejestrowano pomyślnie" };
  } else {
    return { error: "Oops! Nie udało się!" };
  }
};
