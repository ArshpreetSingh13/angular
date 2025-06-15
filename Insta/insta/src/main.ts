import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  ...appConfig,
  providers:[
    ...appConfig.providers ,
    provideAnimations(),
    provideToastr(),     
    provideHttpClient(),

  ]
})
  .catch((err) => console.error(err));
