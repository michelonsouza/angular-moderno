import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  TemplateRef,
} from '@angular/core';

import { Transaction } from '@shared/transaction/interfaces/transaction';

@Component({
  selector: 'app-transactions-container',
  imports: [NgTemplateOutlet],
  templateUrl: './transactions-container.component.html',
  styleUrl: './transactions-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsContainerComponent {
  public readonly transactions = input.required<Transaction[]>();

  protected readonly transactionTemplate =
    contentChild.required<TemplateRef<{ transaction: Transaction }>>('transaction');
  protected readonly noTransactionsTemplate =
    contentChild.required<TemplateRef<unknown>>('noTransactions');
}
