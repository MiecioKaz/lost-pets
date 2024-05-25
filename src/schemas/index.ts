import * as z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Nazwisko/imię obowiązkowe",
  }),
  email: z.string().email({
    message: "Adres email obowiązkowy",
  }),
  password: z.string().min(6, {
    message: "Wymagane jest minimum 6 znaków",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Adres email obowiązkowy",
  }),
  password: z.string().min(1, {
    message: "Hasło obowiązkowe",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Adres email obowiązkowy",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Wymagane jest minimum 6 znaków",
  }),
});

export const RegisterPetSchema = z.object({
  status: z.string().min(1, {
    message: "Pole obowiązkowe",
  }),
  breed: z.string().min(1, {
    message: "Pole obowiązkowe",
  }),

  description: z.string().min(1, {
    message: "Pole obowiązkowe",
  }),
  userName: z.string().min(1, {
    message: "Pole obowiązkowe",
  }),
  phoneNumber: z.string().min(1, {
    message: "Pole obowiązkowe",
  }),
  town: z.string().min(1, {
    message: "Pole obowiązkowe",
  }),
  email: z
    .union([z.string().email(), z.string().length(0)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

export const SearchPetSchema = z.object({
  status: z.string().min(1, {
    message: "Pole obowiązkowe",
  }),
  breed: z.string().min(1, {
    message: "Pole obowiązkowe",
  }),
  town: z.string().min(1, {
    message: "Pole obowiązkowe",
  }),
});
