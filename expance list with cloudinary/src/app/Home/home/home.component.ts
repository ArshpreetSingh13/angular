import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExpanseService } from '../../service/expanse.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private view:ExpanseService){}

  expanseList:any

  ngOnInit(){
    this.view.getItems().subscribe((data)=>{
      this.expanseList=data
      console.log(this.expanseList);
      
      
    })

    
   
  }
   delete(id:string) {
    console.log(id);
    this.view.deleteItems(id).then(()=>{
      console.log("item delete");
      
    }).catch(()=>{
      console.log("err");
      
    })
    
  }

  
    
    
 
}
