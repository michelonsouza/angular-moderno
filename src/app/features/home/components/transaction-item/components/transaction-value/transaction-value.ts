import { Transaction, TransactionType } from '@/app/shared/transaction/interfaces/transaction';
import { Component, computed, input } from '@angular/core';

const classes: Record<TransactionType, string> = {
  income: 'income',
  outcome: 'outcome',
  balance: 'balance',
};
@Component({
  selector: 'app-transaction-value',
  imports: [],
  templateUrl: './transaction-value.html',
  styleUrl: './transaction-value.scss',
  host: {
    '[class]': 'cssClass()',
  },
})
export class TransactionValue {
  public readonly transaction = input.required<Transaction>();

  public readonly cssClass = computed(() => classes[this.transaction().type]);
}
