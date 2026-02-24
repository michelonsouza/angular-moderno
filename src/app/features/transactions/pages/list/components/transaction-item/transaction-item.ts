import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

import type { Transaction } from '@shared/transaction/interfaces/transaction';
import { CustomColorDirective } from '@/app/shared/material/buttons/directives/custom-color.directive';
import { TransactionValue } from './components/transaction-value/transaction-value';
import { IsIncomeDirective } from './directives/is-income.directive';

@Component({
  selector: 'app-transaction-item',
  imports: [
    MatCardModule,
    MatButtonModule,
    TransactionValue,
    CustomColorDirective,
    IsIncomeDirective,
    MatChipsModule,
  ],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.scss',
  host: {
    '[attr.data-transaction]': 'transaction().id',
  },
})
export class TransactionItem {
  public readonly transaction = input.required<Transaction>();

  public edit = output<Transaction>();

  public remove = output<Transaction>();
}
