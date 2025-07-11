import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Posts } from '../../services/posts';
import { Cloudinary } from '../../services/cloudinary/cloudinary';
import { NgxSpinnerModule, NgxSpinnerService, Spinner } from 'ngx-spinner';
import { Router, RouterLink } from '@angular/router';
import { Authen } from '../../services/authen/authen';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ReactiveFormsModule, NgxSpinnerModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  constructor(
    private db: Posts,
    private cloudinary: Cloudinary,
    private spinner: NgxSpinnerService,
    private router: Router,
    
    // private authen:Authen

  ) { }
  selectedFile: File | null = null

 

  PostForm = new FormGroup({
    caption: new FormControl('', Validators.required),
    post: new FormControl(''),
    UserName:new FormControl(''),
    name:new FormControl(''),
    likes:new FormControl(''),
   comments:new FormControl('')
    // share:new FormControl(''),
    

  })

  Upload(event: any) {
    this.selectedFile = event.target.files[0]

  }

  LogOut() {
    sessionStorage.clear()
    this.router.navigate(["/login"])
  }

  OnSubmit() {
    console.log(this.PostForm.value.post);

    

    if (this.selectedFile) {
      this.spinner.show()

      

      this.cloudinary.uploadImage(this.selectedFile).subscribe((UrlRecived: any) => {
        this.PostForm.patchValue({ post: UrlRecived.secure_url })
        this.PostForm.patchValue({ likes: '0' })
        this.PostForm.patchValue({ comments: '' })
        
        this.PostForm.patchValue({ UserName: sessionStorage.getItem("UserName") })
        this.PostForm.patchValue({ name: sessionStorage.getItem("name") })
      
        

        this.db.addPost(this.PostForm.value)
        this.PostForm.reset()
        this.spinner.hide()

      })



    }
  }



}
