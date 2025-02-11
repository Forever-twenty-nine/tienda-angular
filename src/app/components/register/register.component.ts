// angular imports
import { Component } from '@angular/core';
import { Router ,RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
// primeng
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';
// services
import { AuthService } from '../../services/auth.service';
// models
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    InputTextModule,
    ButtonModule,
    RippleModule,
    FloatLabelModule
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  credentials: User = { email: '', password: '' };
  errorMessage: string = '';
  successMessage: string = '';

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private authService: AuthService, private router: Router) { }

  async register(): Promise<void> {

    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.valid) {
      const userCredentials: User = this.registerForm.value as User;

      try {
        const success = await this.authService.register(userCredentials);
        if (success) {
          this.successMessage = 'Registro exitoso. Por favor, inicia sesión.';
          this.router.navigate(['/login']);

        } else {
          this.errorMessage = 'Error inesperado al registrar usuario.';
        }
      } catch (error: any) {
        this.errorMessage = error.message;
        console.error("Registration error:", error);
      }
    } else {
      this.errorMessage = 'Por favor, completa correctamente todos los campos.';
    }

  }

  get usernameControl() { return this.registerForm.get('email'); }
  get passwordControl() { return this.registerForm.get('password'); }

}