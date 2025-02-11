import { Injectable, signal, WritableSignal, Signal, inject } from '@angular/core';
import { LoginCredentials } from '../models/login-credentials.model';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { Auth } from '@angular/fire/auth';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: FirebaseUser | null = null;
  private isAuthenticatedSignal: WritableSignal<boolean> = signal(false);
  private auth: Auth = inject(Auth);

  constructor() {
    this.loadAuthenticationState();
  }

  async register(credentials: User): Promise<boolean> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password);
      this.setAuthenticationState(true);
      return true;
    } catch (error: any) {
      this.logout();
      console.error("Registration error:", error);
      throw new Error(this.handleFirebaseError(error.code));
    }
  }


  async login(credentials: User): Promise<boolean> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, credentials.email, credentials.password);
      this.currentUser = userCredential.user;
      this.setAuthenticationState(true);
      return true;
    } catch (error: any) {
      this.logout();
      console.error("Login error:", error);
      throw new Error(this.handleFirebaseError(error.code));
    }
  }

  logout(): void {
    signOut(this.auth).then(() => {
      this.currentUser = null;
      this.setAuthenticationState(false);
    }).catch((error) => {
      console.error("Logout error:", error);
      this.currentUser = null;
      this.setAuthenticationState(false);
    });
  }

  isAuthenticated(): Signal<boolean> {
    return this.isAuthenticatedSignal.asReadonly();
  }

  getUserDetails(): Signal<FirebaseUser | null> {
    return signal(this.currentUser).asReadonly();
  }

  private setAuthenticationState(isAuthenticated: boolean): void {
    this.isAuthenticatedSignal.set(isAuthenticated);
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('isAuthenticated');
    }
  }

  private loadAuthenticationState(): void {
    onAuthStateChanged(this.auth, (user) => { 
      if (user) {
        this.currentUser = user;
        this.setAuthenticationState(true);
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        this.currentUser = null;
        this.setAuthenticationState(false);
        localStorage.removeItem('isAuthenticated');
      }
    });
  }


  private handleFirebaseError(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Este correo electrónico ya está en uso.';
      case 'auth/invalid-email':
        return 'Correo electrónico no válido.';
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
      default:
        return 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
    }
  }
}