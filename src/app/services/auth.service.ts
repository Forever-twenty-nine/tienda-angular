import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { LoginCredentials } from '../models/login-credentials.model'; 
import { User } from '../models/user.model';
import { MOCK_USERS } from '../mocks/user.mock'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User | null = null; 
  private isAuthenticatedSubject = of(false); 

  constructor() {
    this.loadAuthenticationState();
  }

  login(credentials: LoginCredentials): Observable<boolean> {
    const user = MOCK_USERS.find((u: User) => u.username === credentials.username && u.password === credentials.password);

    if (user) {
      this.currentUser = user; 
      this.setAuthenticationState(true); 
      return of(true); 
    } else {
      this.logout(); 
      return throwError(() => new Error('Credenciales inválidas')); 
    }
  }

  logout(): void {
    this.currentUser = null; 
    this.setAuthenticationState(false); 
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject;
  }

  getUserDetails(): Observable<User | null> {
    return of(this.currentUser);
  }

  private setAuthenticationState(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject = of(isAuthenticated);
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true'); 
    } else {
      localStorage.removeItem('isAuthenticated');
    }
  }

  private loadAuthenticationState(): void {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    this.isAuthenticatedSubject = of(isAuthenticated);
    if (isAuthenticated) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser); 
      }
      
    } else {
      this.currentUser = null; 
    }
  }
}