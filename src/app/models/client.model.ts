export interface ClientDto {
  id: string;
  nom: string;
  email: string;
  telephone?: string;
  adresse?: string;
}

export interface CreateClientRequest {
  nom: string;
  email: string;
  telephone?: string;
  adresse?: string;
}

export interface UpdateClientRequest {
  nom?: string;
  email?: string;
  telephone?: string;
  adresse?: string;
}
