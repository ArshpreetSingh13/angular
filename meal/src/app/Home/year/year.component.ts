import { Component } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MealService } from '../../service/meal.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-year',
  imports: [NgxSpinnerModule,RouterLink],
  templateUrl: './year.component.html',
  styleUrl: './year.component.css'
})
export class YearComponent {
  constructor(private spinner:NgxSpinnerService
    // private meal:MealService
  ){}
  
  months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  




  // mealList:any
  // ngOnInit() {
  //   this.spinner.show();
  //   this.meal.getAll().subscribe((data) => {

  //     this.mealList = data
  //     this.mealList.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());



  //     console.log(this.mealList);


  //     this.spinner.hide();


  //   })





  // }

}
