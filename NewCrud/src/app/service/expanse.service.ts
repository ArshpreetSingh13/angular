import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Expense } from './expanse'; // adjust path accordingly
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private collectionName = 'expenses';

  constructor(private firestore: AngularFirestore) { }

  addExpense(expense: Expense) {
    // Add timestamp
    const expWithDate = {
      ...expense,
      createdAt: new Date()
    };
    return this.firestore.collection<Expense>(this.collectionName).add(expWithDate);
  }


}
