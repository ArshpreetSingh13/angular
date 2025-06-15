import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class Authen {

  constructor(private auth: Auth,
    private db: Firestore,
    private toastr: ToastrService
  ) { }

  reg(data: any) {
    return createUserWithEmailAndPassword(this.auth, data.email, data.password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        console.log("UC", userCredential);

        console.log("uid", uid);

        const userRef = doc(this.db, `users/${uid}`);
        return setDoc(userRef, {
          name: data.name,
          UserName: data.UserName,
          email: data.email,
          createdAt: new Date()
        });


      });
  }


  login(data: any) {
    return signInWithEmailAndPassword(this.auth, data.email, data.password)
      .then((ExistUser) => {




        this.toastr.success("Login Successfully")
        console.log("ex", ExistUser);



        sessionStorage.setItem("isLogined", "true")
        sessionStorage.setItem("uid", ExistUser.user.uid),
          sessionStorage.setItem("email", ExistUser.user.email || "")


      }).catch(() => {

      })
  }

  getData() {

    const uid = sessionStorage.getItem("uid")
    const docRef = doc(this.db, `users${uid}`)
    return docData(docRef, { idField: 'id' })

  }
 
}

