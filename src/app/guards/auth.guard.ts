import { Injectable } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = new AuthService(null as any, null as any);
  const router = new Router(null as any, null as any, null as any, null as any, null as any);
  
  if (authService.isAuthenticated()) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};

@Injectable({
  providedIn: 'root',
})
export class RoleGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles: Role[] = route.data['roles'] || [];
    
    if (requiredRoles.length === 0) {
      return true;
    }
    
    if (this.authService.hasAnyRole(requiredRoles)) {
      return true;
    }
    
    this.router.navigate(['/unauthorized']);
    return false;
  }
}

export const roleGuard = (roles: Role[]): CanActivateFn => {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = route.injector.get(AuthService);
    const router = route.injector.get(Router);
    
    if (!authService.isAuthenticated()) {
      router.navigate(['/login']);
      return false;
    }
    
    if (authService.hasAnyRole(roles)) {
      return true;
    }
    
    router.navigate(['/unauthorized']);
    return false;
  };
};
