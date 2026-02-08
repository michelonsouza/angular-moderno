import { Component, inject, OnInit, signal } from '@angular/core';

import type { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { TransactionsService } from '@/app/shared/transaction/services/transactions';

import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { NoTransactions } from './components/no-transactions/no-transactions';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, NoTransactions],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  readonly #transactionsService = inject(TransactionsService);

  public readonly transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
    this.#getTransactions();
  }

  #getTransactions() {
    this.#transactionsService.getAll().subscribe({
      next: transactions => {
        this.transactions.set(transactions);
      },
    });
  }
}

console.log({ Home });
