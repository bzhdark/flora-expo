import { z } from "zod";

const rucherPermissionSchema = z.object({
  rucher_id: z.number(),
  peut_lire: z.boolean(),
  peut_modifier: z.boolean(),
});

export const createRoleSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(1, { message: "Le nom est requis" })
    .max(150, { message: "Le nom ne doit pas dépasser 150 caractères" }),
  acces_complet_ruchers: z.boolean(),
  peut_creer_ruches: z.boolean(),
  peut_creer_ruchers: z.boolean(),
  peut_creer_taches: z.boolean(),
  peut_modifier_planning: z.boolean(),
  peut_inviter_apiculteurs: z.boolean(),
  peut_modifier_exploitation: z.boolean(),
  peut_exporter_documents: z.boolean(),
  peut_gerer_roles: z.boolean(),
  ruchers: z.array(rucherPermissionSchema).optional(),
});

export type CreateRoleRequest = z.infer<typeof createRoleSchema>;
export type RucherPermission = z.infer<typeof rucherPermissionSchema>;
