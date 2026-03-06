import { Ruche } from '@/lib/types/rucheTypes';

export type Hausse = {
  id: number;
  reference: string;
  taux_remplissage: number;
  ruche_id?: number;
  exploitation_id: number;
  created_at?: string;
  updated_at?: string;
  ruche?: Ruche;
  // exploitation?: Exploitation;
  // hausse_recoltees?: HausseRecoltee[];
  // poses_hausses?: PoseHausses[];
};

export interface HausseRequest {
  reference: string;
  taux_remplissage: number;
  ruche_id?: number | null;
}

export interface CreateHausseBulkRequest {
  suffixe: string;
  prefixe: string;
  nb_a_creer: number;
  numero_depart: number;
}
