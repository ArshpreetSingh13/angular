import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExpenseService } from '../../service/expanse.service'; // adjust path
import { Expense } from '../../service/expanse'; // adjust path

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private expenseService: ExpenseService) { }

  ExpanceForm:any = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.ExpanceForm.valid) {
      const expense: Expense = this.ExpanceForm.value as Expense;
      this.expenseService.addExpense(expense)
        .then(() => {
          alert('Expense added successfully!');
          this.ExpanceForm.reset();
        })
        .catch(error => console.error('Error adding expense:', error));
    } else {
      this.ExpanceForm.markAllAsTouched();
    }
  }
}
