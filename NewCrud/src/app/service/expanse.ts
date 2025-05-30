export interface Expense {
    title: string;
    price: number;
    description: string;
    createdAt?: Date; // optional timestamp
  }