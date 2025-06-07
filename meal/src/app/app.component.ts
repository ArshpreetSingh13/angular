import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from "./Home/nav/nav.component";
import { SideBarComponent } from './Home/side-bar/side-bar.component';
import { routes } from './app.routes';
import { interval } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'meal';
  isCollapsed: boolean = false;
  isLogined=false
 constructor(
  private route:Router,
  private spinner:NgxSpinnerService
 ){}

async ngOnInit() {
  
   this.isLogined = await sessionStorage.getItem("isLogined") === "true";
  console.log(this.isLogined ,"hlo")

 }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(){
    this.spinner.show()
    sessionStorage.clear()
    window.location.reload();
    this.spinner.hide()
    // this.route.navigate(["/"])

  }
}
