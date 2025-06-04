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
    breakfast: new FormControl('', Validators.required),
    lunch: new FormControl('', Validators.required),
    dinner: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    status: new FormControl(true),
  })
  mealList: any
  existDate: any


  ngOnInit() {
    this.meal.getAll().subscribe((data) => {

      this.mealList = data

      console.log(this.mealList);


    })
  }




  Onsubmit() {

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
}
