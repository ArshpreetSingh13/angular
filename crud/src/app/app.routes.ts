import { Routes } from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
import { ErrorComponent } from './Home/error/error.component';
import { ExpanceComponent } from './Home/expance/expance.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    { path:"expance",component:ExpanceComponent},
    {path:"**",component:ErrorComponent}
];
