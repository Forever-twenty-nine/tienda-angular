// Angular
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
// forms
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
// primeng
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
// service
import { AuthService } from '../../services/auth.service';
// models 
import { User } from '../../models/user.model';
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

  credentials: User = { email: '', password: '' };
  errorMessage: string = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,  Validators.email]), 
    password: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) { }

  async login(): Promise<void> { 
    this.errorMessage = '';

    if (this.loginForm.valid) {
      const loginCredentials: User = this.loginForm.value as User;

      try {
        const success = await this.authService.login(loginCredentials); 
        if (success) {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Error inesperado al iniciar sesión.';
        }
      } catch (error: any) {
        this.errorMessage = error.message; 
        console.error('Login error:', error);
      }
    } else {
      this.errorMessage = 'Por favor, completa todos los campos.';
    }
  }

  get usernameControl() { return this.loginForm.get('username'); }
  get passwordControl() { return this.loginForm.get('password'); }
}