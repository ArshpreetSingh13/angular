import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(), 
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "crud-app-2819d", appId: "1:981050189232:web:4ec8d3dae1a2b9e9b86275", databaseURL: "https://crud-app-2819d-default-rtdb.firebaseio.com", storageBucket: "crud-app-2819d.firebasestorage.app", apiKey: "AIzaSyBXZTrnyKKhQyvJ5yGm-6Q9JZ0UZyI4ZgU", authDomain: "crud-app-2819d.firebaseapp.com", messagingSenderId: "981050189232" })), provideFirestore(() => getFirestore())
    
    
  ]
};
