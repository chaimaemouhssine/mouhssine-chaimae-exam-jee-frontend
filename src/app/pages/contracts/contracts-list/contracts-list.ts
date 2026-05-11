import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContractService } from '../../../services/contract.service';
import { AuthService } from '../../../services/auth.service';
import { ContractDto, Role } from '../../../models';

@Component({
  selector: 'app-contracts-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contracts-list.html',
  styleUrl: './contracts-list.css',
})
export class ContractsList implements OnInit {
  contracts: ContractDto[] = [];
  filteredContracts: ContractDto[] = [];
  searchTerm = '';
  selectedStatus = '';
  selectedType = '';
  loading = false;

  constructor(
    private contractService: ContractService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadContracts();
  }

  loadContracts(): void {
    this.loading = true;
    this.contractService.getContracts().subscribe({
      next: (contracts) => {
        this.contracts = contracts;
        this.filteredContracts = contracts;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading contracts:', err);
        this.loading = false;
      },
    });
  }

  filterContracts(): void {
    this.filteredContracts = this.contracts.filter((contract) => {
      const matchSearch =
        contract.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contract.typeContrat.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchStatus = !this.selectedStatus || contract.statut === this.selectedStatus;
      const matchType = !this.selectedType || contract.typeContrat === this.selectedType;

      return matchSearch && matchStatus && matchType;
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = '';
    this.selectedType = '';
    this.filteredContracts = this.contracts;
  }

  editContract(id: string): void {
    // Navigate to edit page
    window.location.href = `/contracts/${id}/edit`;
  }

  deleteContract(id: string): void {
    if (confirm('Are you sure you want to delete this contract?')) {
      this.contractService.deleteContract(id).subscribe({
        next: () => {
          this.contracts = this.contracts.filter((c) => c.id !== id);
          this.filterContracts();
        },
        error: (err) => console.error('Error deleting contract:', err),
      });
    }
  }

  hasRole(role: Role): boolean {
    return this.authService.hasRole(role as any);
  }

  getStatusBadge(status: string): string {
    const badgeMap: { [key: string]: string } = {
      EN_COURS: 'bg-info',
      VALIDE: 'bg-success',
      RESILIE: 'bg-danger',
    };
    return badgeMap[status] || 'bg-secondary';
  }

  getContractTypeBadge(type: string): string {
    const badgeMap: { [key: string]: string } = {
      AUTOMOBILE: 'bg-primary',
      HABITATION: 'bg-success',
      SANTE: 'bg-warning',
    };
    return badgeMap[type] || 'bg-secondary';
  }
}
