import { Component, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import type { Transaction } from '@/app/shared/transaction/interfaces/transaction';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  public readonly transactions = signal<Transaction[]>([
    { value: 100, type: 'income', title: 'Salário' },
    { value: 50, type: 'income', title: 'Freelance' },
    { value: 50, type: 'outcome', title: 'Lanche' },
    { value: 100, type: 'outcome', title: 'Aluguel' },
  ]);
}
