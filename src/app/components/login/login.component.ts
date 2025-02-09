import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginCredentials } from '../../models/login-credentials.model';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
// primeng
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule, 
    FormsModule, 
    InputTextModule, 
    ButtonModule, 
    FloatLabelModule,
    MessageModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  credentials: LoginCredentials = { username: '', password: '' };
  errorMessage: string = '';

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.email]), // Added email validator
    password: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) { }

  async login(): Promise<void> { // Make login method async
    this.errorMessage = '';

    if (this.loginForm.valid) {
      const loginCredentials: LoginCredentials = this.loginForm.value as LoginCredentials;

      try {
        const success = await this.authService.login(loginCredentials); // Call async login and wait for result
        if (success) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.errorMessage = 'Error inesperado al iniciar sesión.'; // Should not usually reach here with Firebase
        }
      } catch (error: any) {
        this.errorMessage = error.message; // Error message from Firebase (user-friendly)
        console.error('Login error:', error);
      }
    } else {
      this.errorMessage = 'Por favor, completa todos los campos.';
    }
  }

  get usernameControl() { return this.loginForm.get('username'); }
  get passwordControl() { return this.loginForm.get('password'); }
}