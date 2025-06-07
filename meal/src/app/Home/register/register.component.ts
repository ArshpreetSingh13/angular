import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
constructor(
  private spinner:NgxSpinnerService,
  private toastr:ToastrService,
  private user:AuthService,
  private route:Router
){}
  ResForm =new FormGroup({
    name :new FormControl('',Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required,Validators.minLength(6)])
  })


  onsubmit(){
    if(this.ResForm.invalid){
      this.ResForm.markAllAsTouched()
    }
    else{
      this.spinner.show()
      this.user.reg(this.ResForm.value).then((data) => {
        console.log("Registration successful", data);
        this.spinner.hide();
        this.toastr.success('Registered Successfully');
        this.ResForm.reset();
        this.route.navigate(["/login"])
      })
        .catch((err) => {
          console.log("Registration Unsuccessful", err);
          this.spinner.hide();
          this.toastr.success('Registered UnSuccessfully');
          this.ResForm.reset();
        })
    }

   
    
  }

}
