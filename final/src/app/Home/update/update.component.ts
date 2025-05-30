import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpanseService } from '../../service/expanse.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-update',
  imports: [ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  constructor(private route:ActivatedRoute,
    private store:ExpanseService,
    private router:Router
  ){}

 Data:any
  ExpanceForm: any = new FormGroup({
    // id: new FormControl(null),
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });


  ngOnInit() {

    const id: any = this.route.snapshot.paramMap.get('id');
    this.store.SingleItems(id).subscribe((data) => {

      console.log(data);
      this.Data=data
      this.ExpanceForm.patchValue({
        title:this.Data.title,
        price: this.Data.price,
        description: this.Data.description
      })
      
      
    
    })    
  }
  
  onSubmit(){
    if(this.ExpanceForm.valid){
      const id: any = this.route.snapshot.paramMap.get('id');
      this.store.updateItem( id, this.ExpanceForm.value)
    }
    this.router.navigate(['/'])
  }
}
