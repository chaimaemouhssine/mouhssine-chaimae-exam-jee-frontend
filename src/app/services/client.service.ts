import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientDto, CreateClientRequest, UpdateClientRequest } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) {}

  getClients(): Observable<ClientDto[]> {
    return this.http.get<ClientDto[]>(this.apiUrl);
  }

  getClientById(id: string): Observable<ClientDto> {
    return this.http.get<ClientDto>(`${this.apiUrl}/${id}`);
  }

  createClient(request: CreateClientRequest): Observable<ClientDto> {
    return this.http.post<ClientDto>(this.apiUrl, request);
  }

  updateClient(id: string, request: UpdateClientRequest): Observable<ClientDto> {
    return this.http.put<ClientDto>(`${this.apiUrl}/${id}`, request);
  }

  deleteClient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
