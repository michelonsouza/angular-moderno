import { MatButtonModule } from '@angular/material/button';
import { Component, inject, OnInit, signal } from '@angular/core';

import type { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { TransactionsService } from '@/app/shared/transaction/services/transactions.service';

import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, NoTransactions, MatButtonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  readonly #transactionsService = inject(TransactionsService);
  readonly #router = inject(Router);

  public readonly transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
    this.#getTransactions();
  }

  edit(transaction: Transaction) {
    this.#router.navigate(['edit', transaction.id]);
  }

  #getTransactions() {
    this.#transactionsService.getAll().subscribe({
      next: transactions => {
        this.transactions.set(transactions);
      },
    });
  }
}
