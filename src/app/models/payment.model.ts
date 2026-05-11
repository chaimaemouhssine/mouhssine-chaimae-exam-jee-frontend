export interface PaymentDto {
  id: string;
  date: string;
  montant: number;
  typePaiement: PaymentType;
  contractId: string;
}

export enum PaymentType {
  MENSUALITE = 'MENSUALITE',
  PAIEMENT_ANNUEL = 'PAIEMENT_ANNUEL',
  PAIEMENT_EXCEPTIONNEL = 'PAIEMENT_EXCEPTIONNEL'
}

export interface CreatePaymentRequest {
  date: string;
  montant: number;
  typePaiement: PaymentType;
  contractId: string;
}

export interface UpdatePaymentRequest {
  date?: string;
  montant?: number;
  typePaiement?: PaymentType;
}
