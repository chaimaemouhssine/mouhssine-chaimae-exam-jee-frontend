import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ContractDto,
  CreateContractRequest,
  UpdateContractRequest,
  AutomobileContractDto,
  HabitationContractDto,
  SanteContractDto,
  CreateAutomobileContractRequest,
  CreateHabitationContractRequest,
  CreateSanteContractRequest,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private apiUrl = 'http://localhost:8080/api/contracts';

  constructor(private http: HttpClient) {}

  getContracts(): Observable<ContractDto[]> {
    return this.http.get<ContractDto[]>(this.apiUrl);
  }

  getContractById(id: string): Observable<ContractDto> {
    return this.http.get<ContractDto>(`${this.apiUrl}/${id}`);
  }

  getContractsByClient(clientId: string): Observable<ContractDto[]> {
    return this.http.get<ContractDto[]>(`${this.apiUrl}/client/${clientId}`);
  }

  getAutomobileContracts(): Observable<AutomobileContractDto[]> {
    return this.http.get<AutomobileContractDto[]>(`${this.apiUrl}/automobile`);
  }

  getHabitationContracts(): Observable<HabitationContractDto[]> {
    return this.http.get<HabitationContractDto[]>(`${this.apiUrl}/habitation`);
  }

  getSanteContracts(): Observable<SanteContractDto[]> {
    return this.http.get<SanteContractDto[]>(`${this.apiUrl}/sante`);
  }

  createAutomobileContract(request: CreateAutomobileContractRequest): Observable<AutomobileContractDto> {
    return this.http.post<AutomobileContractDto>(`${this.apiUrl}/automobile`, request);
  }

  createHabitationContract(request: CreateHabitationContractRequest): Observable<HabitationContractDto> {
    return this.http.post<HabitationContractDto>(`${this.apiUrl}/habitation`, request);
  }

  createSanteContract(request: CreateSanteContractRequest): Observable<SanteContractDto> {
    return this.http.post<SanteContractDto>(`${this.apiUrl}/sante`, request);
  }

  updateContract(id: string, request: UpdateContractRequest): Observable<ContractDto> {
    return this.http.put<ContractDto>(`${this.apiUrl}/${id}`, request);
  }

  deleteContract(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  validateContract(id: string): Observable<ContractDto> {
    return this.http.post<ContractDto>(`${this.apiUrl}/${id}/validate`, {});
  }

  rescindContract(id: string): Observable<ContractDto> {
    return this.http.post<ContractDto>(`${this.apiUrl}/${id}/rescind`, {});
  }
}
