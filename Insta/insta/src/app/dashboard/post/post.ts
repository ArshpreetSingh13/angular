import { ChangeDetectorRef, Component } from '@angular/core';
import { Stories } from '../stories/stories';
import { Posts } from '../../services/posts';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post',
  imports: [Stories,NgClass,NgIf,ReactiveFormsModule],
  templateUrl: './post.html',
  styleUrl: './post.css'
})
export class Post {
  constructor(
    private db:Posts,
    private cdr:ChangeDetectorRef
  ){  }

  AllPosts:any
  liked = false;
  TotalLikes=0
  isAnimating = false;
  comments: any[] = [];
  oldComments:any=""

 

CommentsForm=new FormGroup({
  comment:new FormControl(''),
  CommentBy:new FormControl(''),
  postId:new FormControl('')
})

  likePost(id:any) {
    if (!this.liked) {
      this.toggleLike(id);
    }

    this.isAnimating = true;
    setTimeout(() => {
      this.isAnimating = false;
    }, 600); // Match animation time
  }

  ngOnInit(){
    this.db.getall().subscribe((data)=>{
      console.log("all",data);
      this.AllPosts=data
      
   
     
      this.cdr.detectChanges()
    })
  }
  toggleLike(id:any) {
    
    this.liked = !this.liked;
    console.log(this.AllPosts);
    
    
    for(let i of this.AllPosts){
      console.log(id);
      if(i.id==id){
        this.TotalLikes=i.likes
        if (this.liked) {
          this.TotalLikes += 1
        }
        else {

          this.TotalLikes -= 1
        }



        this.db.likes(id, this.TotalLikes)
        this.cdr.detectChanges()
    
      }
    }
    
  

  }
  // OnComment(id:any){
  //   this.CommentsForm.patchValue({ postId :id})
  //   this.CommentsForm.patchValue({ CommentBy : sessionStorage.getItem("UserName")})

  //   // console.log(this.CommentsForm.value.comment);
    
  //   // const formData: any = this.CommentsForm.value + this.AllPosts.commmets

  
  //   if (this.AllPosts.comments==""){
  //    for (let SingleComment of this.AllPosts) {


  //      this.oldComments = [...SingleComment.commmets, this.oldComments]


  //    }
    
  //  }

   
  //   console.log("My Old", this.oldComments);

  //   const formData = [... this.oldComments, this.CommentsForm.value]
  //   this.comments.push(formData);

   



  // console.log("My commnts",this.comments);
    
  //   this.db.commmets(id,this.comments).then((CommentSaved)=>{
  //     console.log(CommentSaved);
      
  //   }).catch(()=>{

  //   })




    
    
  // }


  OnComment(id: any) {
    this.CommentsForm.patchValue({
      postId: id,
      CommentBy: sessionStorage.getItem("UserName")
    });

    const formData = this.CommentsForm.value;

    const selectedPost = this.AllPosts.find((post: any) => post.id === id);
    const oldComments = selectedPost?.comments || [];

    const updatedComments = [...oldComments, formData];

    this.CommentsForm.reset()
    this.db.commmets(id, updatedComments).then(() => {
      console.log("Comment saved!");
      this.CommentsForm.get('comment')?.reset();
    }).catch((err) => {
      console.error("Error updating comments", err);
    });

  }
  
}
