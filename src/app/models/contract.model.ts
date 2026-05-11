export interface ContractDto {
  id: string;
  dateDebut: string;
  statut: ContractStatus;
  dateValidation?: string;
  montantCotisation: number;
  dureeContrat: number;
  tauxCouverture: number;
  clientId: string;
  typeContrat: ContractType;
}

export enum ContractStatus {
  EN_COURS = 'EN_COURS',
  VALIDE = 'VALIDE',
  RESILIE = 'RESILIE'
}

export enum ContractType {
  AUTOMOBILE = 'AUTOMOBILE',
  HABITATION = 'HABITATION',
  SANTE = 'SANTE'
}

export interface AutomobileContractDto extends ContractDto {
  numeroImmatriculation: string;
  marqueVehicule: string;
  modeleVehicule: string;
}

export interface HabitationContractDto extends ContractDto {
  typeLogement: LogementType;
  adresseLogement: string;
  superficie: number;
}

export enum LogementType {
  APPARTEMENT = 'APPARTEMENT',
  MAISON = 'MAISON',
  LOCAL_COMMERCIAL = 'LOCAL_COMMERCIAL'
}

export interface SanteContractDto extends ContractDto {
  niveauCouverture: CoverageLevel;
  nombrePersonnesCouvertes: number;
}

export enum CoverageLevel {
  BASIQUE = 'BASIQUE',
  INTERMEDIAIRE = 'INTERMEDIAIRE',
  PREMIUM = 'PREMIUM'
}

export interface CreateContractRequest {
  dateDebut: string;
  montantCotisation: number;
  dureeContrat: number;
  tauxCouverture: number;
  clientId: string;
  typeContrat: ContractType;
}

export interface CreateAutomobileContractRequest extends CreateContractRequest {
  numeroImmatriculation: string;
  marqueVehicule: string;
  modeleVehicule: string;
}

export interface CreateHabitationContractRequest extends CreateContractRequest {
  typeLogement: LogementType;
  adresseLogement: string;
  superficie: number;
}

export interface CreateSanteContractRequest extends CreateContractRequest {
  niveauCouverture: CoverageLevel;
  nombrePersonnesCouvertes: number;
}

export interface UpdateContractRequest {
  statut?: ContractStatus;
  dateValidation?: string;
  montantCotisation?: number;
}
