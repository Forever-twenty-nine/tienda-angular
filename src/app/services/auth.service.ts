import { Injectable, signal, WritableSignal, Signal } from '@angular/core';
import { LoginCredentials } from '../models/login-credentials.model';
import { User } from '../models/user.model'; // You might not need User model anymore as Firebase User is used
import { initializeApp } from 'firebase/app'; // Import initializeApp
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth"; // Import Firebase Auth functions
//import { environment } from 'src/environments/environment'; // Import your environment config

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: FirebaseUser | null = null; // Use Firebase User type
  private isAuthenticatedSignal: WritableSignal<boolean> = signal(false);

  constructor() {
    initializeApp(environment.firebase); // Initialize Firebase here using environment config
    this.loadAuthenticationState();
  }

  async register(credentials: LoginCredentials): Promise<boolean> {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, credentials.username, credentials.password); // Username is treated as email here
      this.currentUser = userCredential.user;
      this.setAuthenticationState(true);
      return true; // Registration successful
    } catch (error: any) {
      this.logout(); // Logout in case of registration error
      console.error("Registration error:", error);
      throw new Error(this.handleFirebaseError(error.code)); // Throw user-friendly error
    }
  }


  async login(credentials: LoginCredentials): Promise<boolean> {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, credentials.username, credentials.password); // Username is treated as email here
      this.currentUser = userCredential.user;
      this.setAuthenticationState(true);
      return true; // Login successful
    } catch (error: any) {
      this.logout(); // Logout in case of login error
      console.error("Login error:", error);
      throw new Error(this.handleFirebaseError(error.code)); // Throw user-friendly error
    }
  }

  logout(): void {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.currentUser = null;
      this.setAuthenticationState(false);
    }).catch((error) => {
      console.error("Logout error:", error);
      // Handle logout error if needed, but for now just clear local state
      this.currentUser = null;
      this.setAuthenticationState(false);
    });
  }

  isAuthenticated(): Signal<boolean> {
    return this.isAuthenticatedSignal.asReadonly();
  }

  getUserDetails(): Signal<FirebaseUser | null> { // Return Firebase User type Signal
    return signal(this.currentUser).asReadonly();
  }

  private setAuthenticationState(isAuthenticated: boolean): void {
    this.isAuthenticatedSignal.set(isAuthenticated);
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true');
      // Optionally store user info if needed, but Firebase auth handles user persistence
    } else {
      localStorage.removeItem('isAuthenticated');
    }
  }

  private loadAuthenticationState(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => { // Listen for Firebase auth state changes
      if (user) {
        this.currentUser = user;
        this.setAuthenticationState(true);
        localStorage.setItem('isAuthenticated', 'true'); // Ensure localStorage is in sync
      } else {
        this.currentUser = null;
        this.setAuthenticationState(false);
        localStorage.removeItem('isAuthenticated'); // Ensure localStorage is in sync
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