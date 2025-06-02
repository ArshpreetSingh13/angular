import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExpanseService } from '../../service/expanse.service';

import { Router } from '@angular/router';
import { CloudinaryService } from '../../service/cloudinary/cloudinary.service';




@Component({
  selector: 'app-expanse',
  imports: [ReactiveFormsModule],
  standalone:true,
  templateUrl: './expanse.component.html',
  styleUrl: './expanse.component.css'
})
export class ExpanseComponent {

  constructor(
    private router: Router,
    private store: ExpanseService,
    private Cloudinary:CloudinaryService
    
  ) { }

  selectedfile:File|null=null

  ExpanceForm: any = new FormGroup({
   
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image:new FormControl('')
  });

  uploade(event:any){
    this.selectedfile=event.target.files[0]
  }

  onSubmit() {
   
    if (this.ExpanceForm.valid) {
 
      console.log(this.ExpanceForm.value);

      if (this.selectedfile){
        this.Cloudinary.uploadImage(this.selectedfile).subscribe((uploadeRes:any)=>{
          this.ExpanceForm.patchValue({ image: uploadeRes.secure_url });


          console.log(this.ExpanceForm.value);
          
          this.store.addItem(this.ExpanceForm.value).then(() => console.log(this.ExpanceForm.value)).catch(() => console.log("this.ExpanceForm.value"))
        })
        
      
      }
      

     

    } else {
      this.ExpanceForm.markAllAsTouched();
    }

    this.router.navigate(['/'])
  }
}
