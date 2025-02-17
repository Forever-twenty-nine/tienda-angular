import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated()

  if (isAuthenticated()) {
    return true;
  } else {

    console.log('Acceso no autorizado, redirigiendo a login');
    return router.createUrlTree(['/login']);
  }
};