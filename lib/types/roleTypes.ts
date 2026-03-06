import { Rucher } from "./rucherTypes";
import { User } from "./userTypes";

export interface Role {
  id: number;
  nom: string;
  is_proprietaire: boolean;
  acces_complet_ruchers: boolean;
  exploitation_id: number;
  peut_creer_ruches: boolean;
  peut_creer_ruchers: boolean;
  peut_creer_taches: boolean;
  peut_modifier_planning: boolean;
  peut_inviter_apiculteurs: boolean;
  peut_modifier_exploitation: boolean;
  peut_exporter_documents: boolean;
  peut_gerer_roles: boolean;
  created_at?: string;
  updated_at?: string;
  // exploitation?: Exploitation;
  ruchers?: Rucher[];
  users?: User[];
}
