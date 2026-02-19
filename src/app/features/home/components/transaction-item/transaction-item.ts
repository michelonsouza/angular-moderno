import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import type { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { TransactionValue } from './components/transaction-value/transaction-value';

@Component({
  selector: 'app-transaction-item',
  imports: [MatCardModule, MatButtonModule, TransactionValue],
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
