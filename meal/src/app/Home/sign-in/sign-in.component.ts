
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { reload } from 'firebase/auth';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent{

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private route:Router
  ) { }

  onLogin() {
    if (this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
      this.toastr.error('Fill all the fields');
    }
    else{
      this.spinner.show();
      
      this.auth.login(this.loginForm.value)
      .then(() => {
        this.spinner.hide();
        
          this.toastr.success('Login successful!');
          window.location.reload()
        })
        .catch(() => {
          this.spinner.hide();
          this.toastr.error('Login failed!');
          
        });
        this.route.navigate(["/month"])
    }

   
  }
}
