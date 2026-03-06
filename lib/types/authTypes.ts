export interface RegisterRequest {
  prenom: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterResponse {
  token: string;
  user: any; // TODO Replace with User type
}
