import { ApplicationConfig, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';

import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp } from '@angular/fire/app';
import { environment } from '../environment/environment';




export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideAppInitializer(()=>initializeApp(environment.firebaseConfig)),
    provideFirestore(()=>getFirestore())
  ]
  
  
};
