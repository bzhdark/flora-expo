export type TypeRuche = {
  id: number;
  nom: string;
  nb_cadres: number;
  exploitation_id?: number;
};

export interface TypeRucheRequest {
  nom: string;
  nb_cadres: number;
}
