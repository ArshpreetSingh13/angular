import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { Post } from './dashboard/post/post';
import { Register } from './dashboard/register/register';
import { Login } from './dashboard/login/login';
import { autherGuard } from './Auther/auther-guard';


export const routes: Routes = [
    {
        path: "", redirectTo: '/dashboard/post', pathMatch: 'full'
    },
    {path:"",component:Layout,children:[
        {
            path: "dashboard", canActivate: [autherGuard],component:Dashboard,children:[
            { path: "post", component: Post, canActivate: [autherGuard] },
            
            // { path: "signup", component: Register }
            
        ]},
    ]},
    {path:"signup", component:Register},
    {path:"login", component:Login},
   

];
