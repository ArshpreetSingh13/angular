import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';



bootstrapApplication(AppComponent, {
  ...appConfig,

  providers: [
    ...appConfig.providers || [],
    provideAnimations(), // ✅ Add this line to enable animations

    provideToastr(),
  ],
});