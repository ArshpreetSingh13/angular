import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Posts {

  constructor(private db: Firestore) { }

  addPost(item:any){
    const itemcollection=collection(this.db,"Posts")
    
    return addDoc(itemcollection,item)
  }
  
  userDetails(uid:any){
    console.log(uid);
    
    const docRef = doc(this.db, `users/${uid}`)
    console.log("ref",docRef);
    
    return docData(docRef, { idField: 'id' })

    
    
  }



  getall():Observable<any>{
    const itemcollection = collection(this.db,"Posts")

    return collectionData(itemcollection,{idField:'id'})as Observable<any>
  }

  likes(uid:any, data:any){
    const docRef = doc(this.db,`Posts/${uid}`) 

    return updateDoc(docRef,{likes:data})
  }

  commmets(uid: any, data: any) {
    console.log("Updating comments for", uid, data)
    const docRef = doc(this.db, `Posts/${uid}`)

    return updateDoc(docRef, { comments: data })
  }
}
