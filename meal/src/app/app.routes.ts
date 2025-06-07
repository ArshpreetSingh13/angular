import { Routes } from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
import { AddMealComponent } from './Home/add-meal/add-meal.component';
import { GroceryComponent } from './Home/grocery/grocery.component';
import { YearComponent } from './Home/year/year.component';
import { UpdateComponent } from './update/update.component';
import { WelecomComponent } from './Home/welecom/welecom.component';
import { RegisterComponent } from './Home/register/register.component';
import { SignInComponent } from './Home/sign-in/sign-in.component';

export const routes: Routes = [
    {path:"",component:WelecomComponent},
    {path:"home/:id",component:HomeComponent},
    {path:"addmeal",component:AddMealComponent},
    {path:"grocery/:id",component:GroceryComponent},
    { path:"month",component:YearComponent},
    { path:"update/:id",component:UpdateComponent},
    { path:"register",component:RegisterComponent},
    { path:"login",component:SignInComponent},
];
