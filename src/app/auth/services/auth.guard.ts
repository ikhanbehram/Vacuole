// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  isAuthenticated: boolean = false;
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    this.auth.isAuthenticated.subscribe((bool) => {
      this.isAuthenticated = bool;
    });
    if (!this.isAuthenticated) {
      console.log(this.isAuthenticated);
      this.router.navigate(['/auth', 'login']);
      return false;
    }
    return true;
  }
}
