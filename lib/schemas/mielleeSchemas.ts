import { z } from "zod";

export const createMielleeSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(1, { message: "Le nom est requis" })
    .max(150, { message: "Le nom ne doit pas dépasser 150 caractères" }),
});

export type CreateMielleeRequest = z.infer<typeof createMielleeSchema>;
