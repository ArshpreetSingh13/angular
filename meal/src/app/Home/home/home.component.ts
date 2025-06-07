import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GenaiService } from '../../service/genai/genai.service';
import { MealService } from '../../service/meal.service';
import { NgxSpinner, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgFor } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,
    NgxSpinnerModule, CommonModule, NgFor, NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private ai: GenaiService,
    private meal: MealService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router:Router
 

  ) { }

  res: any

  mealList: any
  page = 1;
  itemsPerPage = 7;
  allmealList: any

  week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  currentMonth: any
  isLogined=false

  ngOnInit() {
    this.isLogined = sessionStorage.getItem("isLogined")=="true"
    const Uid:any=sessionStorage.getItem("uid")
    this.spinner.show();
    const id: any = this.route.snapshot.paramMap.get('id')
    this.currentMonth = this.months[id]
    this.meal.getAll(Uid).subscribe((data) => {

      this.allmealList = data

      this.mealList = this.allmealList.filter((meal: any) => {
        const mealDate = new Date(meal.date);
        return mealDate.getMonth() == id;
      });

      this.mealList.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());


      console.log(this.mealList);


      this.spinner.hide();


    })





  }

  nav(){
    this.toastr.success("Please Login first")
    this.router.navigate(["/"])
  }

  data(day: any) {
    const cDate = new Date(day);
    return this.week[cDate.getDay()]

  }
  // month(monthc:any){
  //   const date = new Date(monthc);
  //   return this.months[date.getMonth()];     

  // }



  delete(id: any) {

    this.meal.delete(id)
    this.toastr.success('Meal deleted successfully!', 'Deleted');
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