import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpanseService {

  constructor(private firestore:Firestore) { }

  addItem(item: any) {
    const itemsCollection = collection(this.firestore, 'items');
    return addDoc(itemsCollection, item)
  }

  getItems(): Observable<any> {
    const itemsCollection=collection(this.firestore, 'items');
    return collectionData(itemsCollection,{idField:'id'})
  }


  deleteItems(id:string){
    const docRef:any=doc(this.firestore,`items/${id}`);
    return deleteDoc(docRef);
  }
  SingleItems(id:string){
    const docRef:any=doc(this.firestore,`items/${id}`);
    return docData(docRef, { idField: 'id' });
  }

  updateItem(id:string, data:any){
    const docRef:any=doc(this.firestore,`items/${id}`);
    return updateDoc(docRef,data)
  }
  
  }

