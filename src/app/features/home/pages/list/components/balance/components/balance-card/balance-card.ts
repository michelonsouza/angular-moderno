import type { TransactionType } from '@shared/transaction/interfaces/transaction';
import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

type BalanceCardCssClass = 'income' | 'outcome' | 'zero';

@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
})
export class BalanceCard {
  public readonly type = input.required<TransactionType>();
  public readonly label = input.required<string>();
  public readonly value = input.required<number>();

  protected readonly cssClass = computed<BalanceCardCssClass>(() => {
    const balanceClass = this.value() > 0 ? 'income' : 'outcome';

    if (this.value() === 0) {
      return 'zero';
    }

    const classes: Record<TransactionType, BalanceCardCssClass> = {
      income: 'income',
      outcome: 'outcome',
      balance: balanceClass,
    };

    return classes[this.type()];
  });
}
