import { Exploitation } from "@/lib/types/exploitationTypes";
import { Role } from "@/lib/types/roleTypes";

export interface User {
  id: number;
  nom?: string;
  prenom: string;
  email: string;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
  current_exploitation_id?: number;
  role?: Role;
  current_exploitation?: Exploitation;
}
