import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MealService } from '../../service/meal.service';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-meal',
  standalone: true,
  imports: [ReactiveFormsModule, NgxSpinnerModule, ToastrModule],
  templateUrl: './add-meal.component.html',
  styleUrl: './add-meal.component.css'
})
export class AddMealComponent implements OnInit {
  constructor(private meal: MealService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }


  MealForm = new FormGroup({
    // day:new FormControl('',Validators.required),
    userId: new FormControl('', Validators.required),
    breakfast: new FormControl('', Validators.required),
    lunch: new FormControl('', Validators.required),
    dinner: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    status: new FormControl(true),
  })
  mealList: any
  existDate: any
  isLogined=false
  userId: string|null=''

  ngOnInit() {
    const Uid: any = sessionStorage.getItem("uid")
    this.isLogined = sessionStorage.getItem("isLogined")=="true"
    this.meal.getAll(Uid).subscribe((data) => {

      this.mealList = data

      this.userId=sessionStorage.getItem("uid")
    
      console.log(this.mealList);


    })
  }




  Onsubmit() {

    this.MealForm.patchValue({userId:this.userId})
    console.log("resu",this.MealForm.value)
    

    if (this.MealForm.valid) {
      const selectedData: any = this.MealForm.value.date
      this.existDate = this.mealList.filter((oldDate: any) => {
        return new Date(selectedData).toDateString() === new Date(oldDate.date).toDateString()
      })

      this.spinner.show();

      if (this.existDate.length>0) {
        console.log("EXIST", this.existDate);
        console.log("SELECT", selectedData);
        this.spinner.hide()

        this.toastr.error('Meal already exists for this date!', 'Duplicate');
      }
      else {



        this.MealForm.patchValue({ status: false })
        console.log(this.MealForm.value);


        this.meal.add(this.MealForm.value).then((Mela) => {
          console.log(Mela);
          console.log("added");
          this.toastr.success('Meal added successfully!', 'Success');
          this.spinner.hide()
          setTimeout(() => this.router.navigate(['/month']), 100);


        }).catch(() => {
          console.log("err");
          this.spinner.hide()

        })
      }
    }

  }

  nav(){
    this.router.navigate(["/login"])
    this.toastr.success("Please Login first")
  }
}
