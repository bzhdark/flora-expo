export type Sirop = {
  id: number;
  nom: string;
  pourcentage_sucre: number;
  exploitation_id: number;
};

export interface SiropRequest {
  nom: string;
  pourcentage_sucre: number;
}

export interface SiropFormData {
  nom: string;
  pourcentage_sucre: string;
}
