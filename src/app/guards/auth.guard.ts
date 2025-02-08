import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Asegúrate de la ruta correcta a tu AuthService
import { map, tap } from 'rxjs/operators'; // Importa operadores de RxJS que vamos a usar

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyecta el AuthService
  const router = inject(Router); // Inyecta el Router

  return authService.isAuthenticated().pipe( // Llama a isAuthenticated() que devuelve un Observable
    map(isAuthenticated => { // Usa el operador map para transformar el valor booleano
      if (isAuthenticated) {
        return true; // Si está autenticado, permite la activación de la ruta
      } else {
        // Si no está autenticado, redirige a la página de login y previene la activación
        return router.createUrlTree(['/login']); // Crea un UrlTree para la redirección
      }
    }),
    tap(isAuthenticated => { // Usa tap para efectos secundarios (opcional, pero útil para debugging)
      if (!isAuthenticated) {
        console.log('Acceso no autorizado, redirigiendo a login'); // Mensaje de consola si no está autenticado
      }
    })
  );
};