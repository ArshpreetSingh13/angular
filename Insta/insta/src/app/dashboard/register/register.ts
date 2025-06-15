import { Component } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authen } from '../../services/authen/authen';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  constructor(private authen: Authen,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    private router:Router
   
  ) {

  }
  RegForm = new FormGroup({
    name: new FormControl('', Validators.required),
    UserName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  OnSubmit() {
    this.spinner.show()
    this.authen.reg(this.RegForm.value).then(()=>{
      this.toastr.success("Login SuccessFully")
      setInterval(()=>{
        this.router.navigate(["/login"])
      },1000)
      
    })
    .catch(()=>{
      
      this.toastr.error("Login UnSuccessFully")
    })
    this.RegForm.reset()
    this.spinner.hide()




  }



}
