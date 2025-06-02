import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {  provideHttpClient } from '@angular/common/http';



export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(),
   
     provideFirebaseApp(() => initializeApp({ projectId: "meal-77328", appId: "1:197324083991:web:8faebd2e508feb3c84dd52", storageBucket: "meal-77328.firebasestorage.app", apiKey: "AIzaSyDPCiBr79YGvvDVSIXJVpid6aUsWVpU8jA", authDomain: "meal-77328.firebaseapp.com", messagingSenderId: "197324083991", measurementId: "G-1VLK8S2TL0" })), provideFirestore(() => getFirestore())]
};
