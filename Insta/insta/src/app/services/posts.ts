import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class Posts {

  constructor(private db: Firestore) { }

  addPost(item:any){
    const itemcollection=collection(this.db,"Posts")

    return addDoc(itemcollection,item)
  }
}
