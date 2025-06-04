import { Component, OnInit } from '@angular/core';
import { MealService } from '../service/meal.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update',
  imports: [NgxSpinnerModule,ReactiveFormsModule,ToastrModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
  constructor(private db:MealService,
    private spinner:NgxSpinnerService,
    private route:ActivatedRoute,
    private toastr:ToastrService,
    private router:Router

  ){}
  singleMeal:any

  MealForm = new FormGroup({
    breakfast: new FormControl('', Validators.required),
    lunch: new FormControl('', Validators.required),
    dinner: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    status: new FormControl(true),
  })

  Data:any
  
  ngOnInit(): void {
    const id:string|null=this.route.snapshot.paramMap.get('id')
    
    this.db.single(id).subscribe((data)=>{

       this.Data=data
      this.MealForm.patchValue({
        breakfast:this.Data.breakfast,
        lunch:this.Data.lunch,
        dinner:this.Data.dinner,
        date:this.Data.date
      })
    })
  }


  Onsubmit(){
    
    if(this.MealForm.valid){
      const id:string|null=this.route.snapshot.paramMap.get('id')
      this.spinner.show()
      
      this.db.update(id,this.MealForm.value)
      this.spinner.hide()
      this.toastr.success('Meal updated successfully!', 'Updated');
      setTimeout(()=>{ this.router.navigate(["/month"]),100 })

      
      
    }
    
  }

}
