import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated() // Lee el valor del Signal directamente

  if (isAuthenticated()) {
    return true; // Si está autenticado, permite la activación de la ruta
  } else {
    // Si no está autenticado, redirige a la página de login y previene la activación
    console.log('Acceso no autorizado, redirigiendo a login'); // Mensaje de consola si no está autenticado
    return router.createUrlTree(['/login']); // Crea un UrlTree para la redirección
  }
};