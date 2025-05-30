import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpansesService } from '../../service/expanses.service';



@Component({
  selector: 'app-expance',
  standalone: true,
  imports: [ReactiveFormsModule],
  
  templateUrl: './expance.component.html',
  styleUrls: ['./expance.component.css']
})
export class ExpanceComponent {

  constructor(private db:ExpansesService){}

  newExpanse:any={}


  ExpanceForm=new FormGroup({
    title:new FormControl('',Validators.required),
    price:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required)
  })

  onSubmit(){
    if(this.ExpanceForm.valid){
      

      
      this.db.addItem(this.ExpanceForm.value).then(() => console.log(this.ExpanceForm.value)).catch(() => console.log("this.ExpanceForm.value"))

     
    
    }
    else{
      this.ExpanceForm.markAllAsTouched();
    }
    
  }

}
