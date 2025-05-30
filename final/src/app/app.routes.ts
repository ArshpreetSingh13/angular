import { Routes } from '@angular/router';
import { ExpanseComponent } from './Home/expanse/expanse.component';
import { HomeComponent } from './Home/home/home.component';
import { UpdateComponent } from './Home/update/update.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path:"addexpanse",component:ExpanseComponent},
    { path:"update/:id",component:UpdateComponent}
];
