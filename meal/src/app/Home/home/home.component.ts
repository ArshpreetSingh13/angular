import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GenaiService } from '../../service/genai/genai.service';
import { MealService } from '../../service/meal.service';
import { NgxSpinner, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  standalone:true,
  imports: [RouterLink,
    NgxSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private ai:GenaiService,
    private meal:MealService,
    private spinner: NgxSpinnerService
  ){}

  res:any

  mealList:any

  week=["day","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  
   ngOnInit(){
     this.spinner.show();
    this.meal.getAll().subscribe((data)=>{
       
      this.mealList=data

      console.log(this.mealList);
      this.spinner.hide();
    })

    
    
  }
  


  delete(id:any){
      
      this.meal.delete(id)
  }
  // ngOnInit() {
  //   this.ai.generateContent("Give 1 to 10 even numbers").subscribe({
  //     next: (result) => {
  //       this.res = result?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
  //       console.log("AI Response:", this.res);
  //     },
  //     error: (err) => {
  //       console.error("API Error:", err);
  //     }
  //   });
  // }
}