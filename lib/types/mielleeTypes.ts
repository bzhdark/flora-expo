export type Miellee = {
  id: number;
  nom: string;
  exploitation_id?: number | null;
};

export interface MielleeRequest {
  nom: string;
}
