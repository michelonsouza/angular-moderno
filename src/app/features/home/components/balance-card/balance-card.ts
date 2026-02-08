import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

type BalanceCardType = 'income' | 'outcome' | 'balance';

type BalanceCardCssClass = 'income' | 'outcome';

@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
})
export class BalanceCard {
  public readonly type = input.required<BalanceCardType>();
  public readonly label = input.required<string>();
  public readonly value = input.required<number>();

  protected readonly cssClass = computed<BalanceCardCssClass>(() => {
    const classes: Record<BalanceCardType, BalanceCardCssClass> = {
      income: 'income',
      outcome: 'outcome',
      balance: this.value() > 0 ? 'income' : 'outcome',
    };

    return classes[this.type()];
  });
}
