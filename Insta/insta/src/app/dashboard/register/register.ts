import { Component } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authen } from '../../services/authen/authen';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { Cloudinary } from '../../services/cloudinary/cloudinary';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink,NgxSpinnerModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  constructor(private authen: Authen,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private cloudinary: Cloudinary

  ) {

  }
  RegForm = new FormGroup({
    name: new FormControl('', Validators.required),
    UserName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    profile: new FormControl('', Validators.required),

  })
  selectedFile: any

  Upload(event: any) {
    this.selectedFile = event.target.files[0]

  }

  OnSubmit() {
    
    this.spinner.show()
    this.cloudinary.uploadImage(this.selectedFile).subscribe((ResUrl: any) => {

      this.RegForm.patchValue({ profile: ResUrl.secure_url })
      console.log("URL", ResUrl.secure_url);
      
      console.log(this.RegForm.value);
      
      this.authen.reg(this.RegForm.value).then(() => {
        this.toastr.success("Login SuccessFully")
        console.log("Login");
        setInterval(() => {
          this.RegForm.reset()
          this.spinner.hide()
          this.router.navigate(["/login"])
        }, 1000)
        
      })
      .catch(() => {
        
        this.toastr.error("Login UnSuccessFully")
        this.spinner.hide()
        })
    })
    




  }



}
