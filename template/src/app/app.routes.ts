import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { Hero } from './dashboard/hero/hero';
import { About } from './dashboard/about/about';

export const routes: Routes = [
    {
        path: "", redirectTo: '/dashboard', pathMatch: 'full'
    },

    {
        path: "", component: Layout, children: [
            {
                path: "dashboard", component: Dashboard,children:[
                    {path:"hero",component:Hero},
                    {path:"about",component:About},
                ]
            }
        ]
    }
];
