import { z } from "zod";

export const createSiropSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(1, { message: "Le nom est requis" })
    .max(150, { message: "Le nom ne doit pas dépasser 150 caractères" }),
  pourcentage_sucre: z.coerce
    .string({ error: "Doit être un nombre" })
    .transform((val) => Number(val.replaceAll(",", ".")))
    .refine((val) => !isNaN(val), {
      message: "Doit être un nombre",
    })
    .refine((val) => val < 100, {
      message: "Doit être inférieur à 100",
    }),
});

export type CreateSiropRequest = z.infer<typeof createSiropSchema>;
