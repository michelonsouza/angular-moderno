import { Component, computed, input } from '@angular/core';

import type { Transaction } from '@shared/transaction/interfaces/transaction';
import { sumTransactions } from '@shared/transaction/functions/sum-transactions';
import { BalanceCard } from './components/balance-card/balance-card';

@Component({
  selector: 'app-balance',
  imports: [BalanceCard],
  templateUrl: './balance.html',
  styleUrl: './balance.scss',
})
export class Balance {
  public transactions = input.required<Transaction[]>();

  protected readonly totalIncomes = computed(() => {
    return sumTransactions(this.transactions(), 'income');
  });

  protected readonly totalOutcomes = computed(() => {
    return sumTransactions(this.transactions(), 'outcome');
  });

  protected readonly balance = computed(() => {
    return this.totalIncomes() - this.totalOutcomes();
  });
}
