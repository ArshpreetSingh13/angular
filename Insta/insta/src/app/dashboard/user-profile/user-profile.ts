import { Component, OnInit } from '@angular/core';
import { Posts } from '../../services/posts';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile implements OnInit {

  constructor(
    private db:Posts,
    
  ){

  }

  UserBio = new FormGroup({
    name: new FormControl(''),
    UserName: new FormControl(''),
    bio: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    gender: new FormControl('')
  })

  userDetails:any
  ngOnInit() { 

    const uid=sessionStorage.getItem("uid")
    this.db.userDetails(uid).subscribe((UserData)=>{
      this.userDetails=UserData

      this.UserBio.patchValue({
        name: this.userDetails.name ,
        UserName: this.userDetails.UserName ,
        bio: this.userDetails.bio ,
        phone: this.userDetails.phone ,
        gender: this.userDetails.gender ,
       
        email: this.userDetails.email 
        
      });
    })
  }


  OnSubmit(){
    console.log(this.UserBio.value);
    const uid = sessionStorage.getItem("uid")

    this.db.UpdateUser(uid, this.UserBio.value).then((Updata)=>{
      console.log(Updata);
      
    }).catch(()=>{

    })



    
  }


}
