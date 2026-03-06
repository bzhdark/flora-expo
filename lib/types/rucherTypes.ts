// Entities
export interface Rucher {
  id: number;
  nom: string;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  updatedAt: string;
  ruches_count?: number;
  pivot?: {
    peut_lire: boolean;
    peut_modifier: boolean;
  };
}

// API
export interface CreateRucherRequest {
  nom: string;
  latitude: number | null;
  longitude: number | null;
  environnement: string | null;
  adresse1: string | null;
  adresse2: string | null;
  code_postal: string | null;
  ville: string | null;
  pays: string | null;
}

export interface DeleteRucherRequest {
  garder_ruches: boolean;
  rucherId: number;
}
