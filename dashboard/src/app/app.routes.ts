import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: "", redirectTo: '/dashboard', pathMatch: 'full'
    },

    {
        path: "", component: LayoutComponent, children: [
            {
                path: "dashboard", component: DashboardComponent
            }
        ]
    }



];
