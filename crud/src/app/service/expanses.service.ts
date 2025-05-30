import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ExpansesService {

  constructor(private ex:Firestore) { }
  addItem(item: any): Promise<any> {
    const itemsCollection = collection(this.ex , 'items');
    return addDoc(itemsCollection, item);
  }
}
