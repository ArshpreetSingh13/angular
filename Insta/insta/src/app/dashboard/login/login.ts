import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authen } from '../../services/authen/authen';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,NgxSpinnerModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

constructor(
  private authen:Authen,
  private toastr:ToastrService,
  private router:Router,
  private spinner:NgxSpinnerService
){}

  LogForm=new FormGroup({
    email:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required),
  })

  OnSubmmit(){
    this.spinner.show()
    console.log(this.LogForm.value);
    this.authen.login(this.LogForm.value).then(()=>{
      
      this.spinner.hide()
      // this.toastr.success("Logined Successfully")
      setInterval(()=>{
        this.router.navigate(["/"])
      },1000)

      
    }).catch(()=>{
      this.toastr.error(" user Not Found")
      
    })
    
  }

}
