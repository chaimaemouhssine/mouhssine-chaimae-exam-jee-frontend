import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentDto, CreatePaymentRequest, UpdatePaymentRequest } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/api/payments';

  constructor(private http: HttpClient) {}

  getPayments(): Observable<PaymentDto[]> {
    return this.http.get<PaymentDto[]>(this.apiUrl);
  }

  getPaymentById(id: string): Observable<PaymentDto> {
    return this.http.get<PaymentDto>(`${this.apiUrl}/${id}`);
  }

  getPaymentsByContract(contractId: string): Observable<PaymentDto[]> {
    return this.http.get<PaymentDto[]>(`${this.apiUrl}/contract/${contractId}`);
  }

  createPayment(request: CreatePaymentRequest): Observable<PaymentDto> {
    return this.http.post<PaymentDto>(this.apiUrl, request);
  }

  updatePayment(id: string, request: UpdatePaymentRequest): Observable<PaymentDto> {
    return this.http.put<PaymentDto>(`${this.apiUrl}/${id}`, request);
  }

  deletePayment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
