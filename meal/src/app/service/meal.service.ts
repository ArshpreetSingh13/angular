import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, deleteDoc, doc } from '@firebase/firestore';
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
}
