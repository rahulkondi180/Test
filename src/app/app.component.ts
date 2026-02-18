import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonApp,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

interface Expense {
  name: string;
  amount: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonApp,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonList
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Simple Expense Splitter';
  participantCount = 3;
  expenseName = '';
  expenseAmount: number | null = null;
  expenses: Expense[] = [];

  addExpense(): void {
    const trimmedName = this.expenseName.trim();
    const amount = Number(this.expenseAmount);

    if (!trimmedName || !Number.isFinite(amount) || amount <= 0) {
      return;
    }

    this.expenses = [...this.expenses, { name: trimmedName, amount }];
    this.expenseName = '';
    this.expenseAmount = null;
  }

  clearAll(): void {
    this.expenses = [];
  }

  get totalAmount(): number {
    return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  get splitPerPerson(): number {
    if (!Number.isFinite(this.participantCount) || this.participantCount <= 0) {
      return 0;
    }

    return this.totalAmount / this.participantCount;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  }
}
