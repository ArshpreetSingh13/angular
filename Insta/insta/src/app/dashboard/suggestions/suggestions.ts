import { ChangeDetectorRef, Component } from '@angular/core';
import { Posts } from '../../services/posts';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Authen } from '../../services/authen/authen';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-suggestions',
  imports: [NgxSpinnerModule,NgIf],
  templateUrl: './suggestions.html',
  styleUrl: './suggestions.css'
})
export class Suggestions {
  constructor(
    private db:Posts,
    private spinner:NgxSpinnerService,
    private changeDetectorRef:ChangeDetectorRef,
    private auth:Authen
  ){}

  UserData: any

  AllUsers:any

  UserId:any
  ngOnInit() {
    this.spinner.show()
    this.UserId = sessionStorage.getItem("uid")
    this.db.userDetails(this.UserId).subscribe((data) => {
      this.UserData = data
      
      sessionStorage.setItem("UserName",this.UserData.UserName)
      sessionStorage.setItem("name",this.UserData.name)

      
      this.auth.allUsers().subscribe((Udata)=>{
        this.AllUsers=Udata
        console.log("AllU",this.AllUsers);
        this.changeDetectorRef.detectChanges()
        
        
      })
      
      // this.changeDetectorRef.detectChanges()
      this.spinner.hide()
    })
  }

}
