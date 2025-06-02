import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MealService } from '../../service/meal.service';
import { Router } from '@angular/router';
import {  NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-meal',
  standalone:true,
  imports: [ReactiveFormsModule,NgxSpinnerModule],
  templateUrl: './add-meal.component.html',
  styleUrl: './add-meal.component.css'
})
export class AddMealComponent implements OnInit {
  constructor(private meal:MealService,
    private router:Router,
    private spinner:NgxSpinnerService
  ){}
 

  MealForm=new FormGroup({
    day:new FormControl('',Validators.required),
    breakfast:new FormControl('',Validators.required),
    lunch:new FormControl('',Validators.required),
    dinner:new FormControl('',Validators.required),
    status:new FormControl(true),
  })
  mealList: any

  ngOnInit() {
    this.meal.getAll().subscribe((data) => {

      this.mealList = data

      console.log(this.mealList);
    })
  }




  Onsubmit(){

    this.spinner.show()
    if(this.MealForm.valid){

      this.MealForm.patchValue({status:false})
      console.log(this.MealForm.value);


      this.meal.add(this.MealForm.value).then((Mela)=>{
        console.log(Mela);
        console.log("added");
        this.spinner.hide()
        this.router.navigate(['/'])

        
      }).catch(()=>{
        console.log("err");
        
      })
    }
    
  }
}
