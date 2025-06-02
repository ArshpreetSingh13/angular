import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpanseService } from '../../service/expanse.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CloudinaryService } from '../../service/cloudinary/cloudinary.service';



@Component({
  selector: 'app-update',
  imports: [ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  constructor(private route:ActivatedRoute,
    private store:ExpanseService,
    private router:Router,
    private cloudinary:CloudinaryService
  ){}

 Data:any
  ExpanceForm: any = new FormGroup({
    // id: new FormControl(null),
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image:new FormControl('')
  });


  ngOnInit() {

    const id: any = this.route.snapshot.paramMap.get('id');
    this.store.SingleItems(id).subscribe((data) => {


      this.Data=data
      this.ExpanceForm.patchValue({
        title:this.Data.title,
        price: this.Data.price,
        description: this.Data.description,
        image:this.Data.image
      })
      
   
      
    
    })    
  }
  selected:File|null=null

  Onchange(file:any){
    this.selected=file.target.files[0]
  }
  
  onSubmit(){
    if(this.ExpanceForm.valid){

      
      if(this.selected){
        this.cloudinary.uploadImage(this.selected).subscribe(async(urlres:any)=>{
          await this.ExpanceForm.patchValue({ image: urlres.secure_url })
          
 
          const id: any = this.route.snapshot.paramMap.get('id');
      

          this.store.updateItem(id, this.ExpanceForm.value)
          this.router.navigate(['/'])
          
        })
      }
      
    
    }
    
  }
}
