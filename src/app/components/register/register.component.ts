import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginCredentials } from '../../models/login-credentials.model'; // Aunque usemos LoginCredentials, en un caso real, crearías un RegisterCredentials
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
// primeng
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule, RippleModule, FloatLabelModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  credentials: LoginCredentials = { username: '', password: '' }; //  In real case,  you might use RegisterCredentials model
  errorMessage: string = '';
  successMessage: string = '';

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.email]), // Added email validator
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private authService: AuthService, private router: Router) { }

  async register(): Promise<void> { // Make register method async
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.valid) {
      const registerCredentials: LoginCredentials = this.registerForm.value as LoginCredentials;

      try {
        const success = await this.authService.register(registerCredentials); // Call async register and wait
        if (success) {
          this.successMessage = 'Registro exitoso. Por favor, inicia sesión.';
          // Optionally redirect to login after successful registration
          // this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Error inesperado al registrar usuario.'; // Shouldn't usually reach here with Firebase
        }
      } catch (error: any) {
        this.errorMessage = error.message; // Error message from Firebase (user-friendly)
        console.error("Registration error:", error);
      }
    } else {
      this.errorMessage = 'Por favor, completa correctamente todos los campos.';
    }
  }

  get usernameControl() { return this.registerForm.get('username'); }
  get passwordControl() { return this.registerForm.get('password'); }
}