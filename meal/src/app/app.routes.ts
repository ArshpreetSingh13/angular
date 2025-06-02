import { Routes } from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
import { AddMealComponent } from './Home/add-meal/add-meal.component';
import { GroceryComponent } from './Home/grocery/grocery.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"addmeal",component:AddMealComponent},
    {path:"grocery/:id",component:GroceryComponent},
];
