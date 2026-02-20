import { Component, computed, input } from '@angular/core';
import { BalanceCard } from './components/balance-card/balance-card';
import type { Transaction } from '@shared/transaction/interfaces/transaction';
@Component({
  selector: 'app-balance',
  imports: [BalanceCard],
  templateUrl: './balance.html',
  styleUrl: './balance.scss',
})
export class Balance {
  public transactions = input.required<Transaction[]>();

  protected readonly totalIncomes = computed(() => {
    return this.transactions()
      .filter(item => item.type === 'income')
      .reduce((total, item) => total + item.value, 0);
  });

  protected readonly totalOutcomes = computed(() => {
    return this.transactions()
      .filter(item => item.type === 'outcome')
      .reduce((total, item) => total + item.value, 0);
  });

  protected readonly balance = computed(() => {
    return this.totalIncomes() - this.totalOutcomes();
  });
}
