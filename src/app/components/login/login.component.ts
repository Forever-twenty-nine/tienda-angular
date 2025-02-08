import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginCredentials } from '../../models/login-credentials.model';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html'

})
export class LoginComponent {

  credentials: LoginCredentials = { username: '', password: '' }; // Modelo para las credenciales
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.errorMessage = ''; // Limpia cualquier mensaje de error previo

    this.authService.login(this.credentials).subscribe({
      next: (success) => {
        if (success) {
          // Login exitoso, redirige al dashboard de admin o a donde corresponda
          this.router.navigate(['/admin/dashboard']); // Ejemplo: redirige al dashboard
        } else {
          // Aunque en el mock siempre devuelve true si las credenciales son correctas,
          // en un escenario real aquí podrías manejar un caso de éxito falso (raro, pero posible)
          this.errorMessage = 'Error inesperado al iniciar sesión.';
        }
      },
      error: (error) => {
        // Error en el login (credenciales inválidas, error del servidor, etc.)
        this.errorMessage = 'Credenciales inválidas. Por favor, inténtalo de nuevo.'; // Mensaje de error genérico
        console.error('Error de login:', error); // Log para debugging, no mostrar errores técnicos al usuario final
      }
    });
  }

}
