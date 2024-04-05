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
  // code: z.optional(z.string()),
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
