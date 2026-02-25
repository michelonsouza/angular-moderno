import { Transaction, TransactionType } from '@shared/transaction/interfaces/transaction';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

const classes: Record<TransactionType, string> = {
  income: 'income',
  outcome: 'outcome',
  balance: 'balance',
};
@Component({
  selector: 'app-transaction-value',
  imports: [CurrencyPipe],
  templateUrl: './transaction-value.html',
  styleUrl: './transaction-value.scss',
  host: {
    '[class]': 'cssClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionValue {
  public readonly transaction = input.required<Transaction>();

  public readonly cssClass = computed(() => classes[this.transaction().type]);
}
