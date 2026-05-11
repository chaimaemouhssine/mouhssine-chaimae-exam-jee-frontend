import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ContractService } from '../../services/contract.service';
import { PaymentService } from '../../services/payment.service';
import { ContractDto, PaymentDto } from '../../models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  currentUser$ = this.authService.currentUser$;
  totalContracts = 0;
  activeContracts = 0;
  totalPayments = 0;
  recentContracts: ContractDto[] = [];
  recentPayments: PaymentDto[] = [];

  constructor(
    private authService: AuthService,
    private contractService: ContractService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.contractService.getContracts().subscribe({
      next: (contracts) => {
        this.totalContracts = contracts.length;
        this.activeContracts = contracts.filter((c) => c.statut === 'EN_COURS').length;
        this.recentContracts = contracts.slice(0, 5);
      },
      error: (err) => console.error('Error loading contracts:', err),
    });

    this.paymentService.getPayments().subscribe({
      next: (payments) => {
        this.totalPayments = payments.length;
        this.recentPayments = payments.slice(0, 5);
      },
      error: (err) => console.error('Error loading payments:', err),
    });
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
