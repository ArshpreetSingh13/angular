import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),provideHttpClient() ,provideFirebaseApp(() => initializeApp({ projectId: "insta-1189d", appId: "1:831487222635:web:8a9225a419585f9635e22e", storageBucket: "insta-1189d.firebasestorage.app", apiKey: "AIzaSyD0p2jZ0kzwU_xdDJbNmgPphJLPnqg9wJM", authDomain: "insta-1189d.firebaseapp.com", messagingSenderId: "831487222635", measurementId: "G-X9RMQCKCZE" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
