import { z } from "zod";

export const createTypeRucheSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(1, { message: "Le nom est requis" })
    .max(150, { message: "Le nom ne doit pas dépasser 150 caractères" }),
  nb_cadres: z.coerce
    .string({ error: "Doit être un nombre" })
    .transform((val) => Number(val.replaceAll(",", ".")))
    .refine((val) => !isNaN(val), {
      message: "Doit être un nombre",
    })
    .refine((val) => val > 0, {
      message: "Doit être supérieur à 0",
    }),
});
