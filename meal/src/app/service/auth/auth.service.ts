import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth) { }

  reg(data:any){
     return createUserWithEmailAndPassword(this.auth,data.email,data.password)
    
  }

  login(data:any){
    return signInWithEmailAndPassword(this.auth,data.email,data.password)
      .then(async (userExist)=>{
      console.log(userExist)
      sessionStorage.setItem("isLogined", "true")
      sessionStorage.setItem("uid",userExist.user.uid),
      sessionStorage.setItem("email",userExist.user.email || "")

        const token:any = await userExist.user.getIdToken
          sessionStorage.setItem("token", token)

      
    })
    .catch(()=>{

    })
  }
}
