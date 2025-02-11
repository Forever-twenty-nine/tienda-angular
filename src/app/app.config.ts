import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation(),),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }), provideFirebaseApp(() => initializeApp({
      projectId: "ftn-site-app",
      appId: "1:720382724612:web:31d93cba63f247c1d50351",
      storageBucket: "ftn-site-app.firebasestorage.app",
      apiKey: "AIzaSyAvLALRkAeltK6IvMBatIxSapmFIr_BOdI",
      authDomain: "ftn-site-app.firebaseapp.com",
      messagingSenderId: "720382724612",
      measurementId: "G-RH4G68C5FR"
    })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage())
  ]
};