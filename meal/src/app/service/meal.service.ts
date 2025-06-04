import { Injectable } from '@angular/core';
import { collection, collectionData, docData, Firestore } from '@angular/fire/firestore';
import { addDoc, deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(private firestore:Firestore) { }

  add(item:any){
    const itemCollection = collection(this.firestore,"dailymeal")
    
    return addDoc(itemCollection,item)
  }
  
  getAll(): Observable<any>{
    const itemCollection = collection(this.firestore,"dailymeal")

    return collectionData(itemCollection,{idField:'id'})

  }

  delete(id:string){
    const itemcollection = collection(this.firestore,"dailymeal")

    return deleteDoc(doc(itemcollection,id))
  }
  single(id:string|null){
    const docRef = doc(this.firestore,`dailymeal/${id}`)

    return docData(docRef,{idField:'id'})
  }

  update(id:string|null, data:any){
    const docRef = doc(this.firestore, `dailymeal/${id}`)

    return updateDoc(docRef,data)
  }
}
