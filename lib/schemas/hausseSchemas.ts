import { z } from "zod";

export const createHausseSchema = z.object({
  reference: z
    .string()
    .trim()
    .min(1, { message: "La référence est requise" })
    .max(100, { message: "La référence ne doit pas dépasser 100 caractères" }),
  taux_remplissage: z.coerce
    .string({ error: "Doit être un nombre" })
    .transform((val) => Number(val.replaceAll(",", ".")))
    .refine((val) => !isNaN(val), {
      message: "Doit être un nombre",
    })
    .refine((val) => val >= 0 && val <= 100, {
      message: "Doit être compris entre 0 et 100",
    }),
});

export const createHausseBulkSchema = z.object({
  prefixe: z
    .string()
    .trim()
    .max(20, { message: "Le préfixe ne doit pas dépasser 20 caractères" }),
  suffixe: z
    .string()
    .trim()
    .max(20, { message: "Le suffixe ne doit pas dépasser 20 caractères" }),
  nb_a_creer: z.coerce
    .string({ error: "Doit être un nombre" })
    .transform((val) => Number(val.replaceAll(",", ".")))
    .refine((val) => !isNaN(val), {
      message: "Doit être un nombre",
    })
    .refine((val) => val > 0, {
      message: "Doit être supérieur à 0",
    }),
  numero_depart: z.coerce
    .string({ error: "Doit être un nombre" })
    .transform((val) => Number(val.replaceAll(",", ".")))
    .refine((val) => !isNaN(val), {
      message: "Doit être un nombre",
    })
    .refine((val) => val >= 0, {
      message: "Doit être supérieur ou égal à 0",
    }),
});
