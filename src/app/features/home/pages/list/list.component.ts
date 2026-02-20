import { MatButtonModule } from '@angular/material/button';
import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ConfirmationDialogService } from '@/app/shared/dialog/confirmation/services/confirmation-dialog.service';
import { FeedbackService } from '@/app/shared/feedback/services/feedback.service';
import { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { TransactionsService } from '@/app/shared/transaction/services/transactions.service';
import { Balance } from './components/balance/balance';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { TransactionsContainerComponent } from './components/transactions-container/transactions-container.component';

@Component({
  selector: 'app-list',
  imports: [
    Balance,
    TransactionItem,
    NoTransactions,
    MatButtonModule,
    RouterLink,
    TransactionsContainerComponent,
    TransactionsContainerComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  readonly #feedbackService = inject(FeedbackService);
  readonly #transactionsService = inject(TransactionsService);
  readonly #router = inject(Router);
  readonly #confirmationDialogService = inject(ConfirmationDialogService);

  public readonly transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
    this.#getTransactions();
  }

  edit(transaction: Transaction) {
    this.#router.navigate(['edit', transaction.id]);
  }
  remove(transaction: Transaction) {
    this.#confirmationDialogService
      .open({
        title: 'Deletar transação',
        message: `Você realmenmte quer deletar a transação ${transaction.title}?`,
      })
      .subscribe({
        next: () => {
          this.#transactionsService.deleteById(transaction.id).subscribe({
            next: () => {
              this.#removeLocalTransaction(transaction);
              this.#feedbackService.success(
                `Transação ${transaction.title} removida com sucesso`,
                'Fechar',
              );
            },
            error: () => {
              this.#feedbackService.error(
                `Erro ao remover transação ${transaction.title}`,
                'Fechar',
              );
            },
          });
        },
      });
  }

  #removeLocalTransaction(transaction: Transaction) {
    this.transactions.update(prev =>
      prev.filter(prevTransaction => prevTransaction.id !== transaction.id),
    );
  }

  #getTransactions() {
    this.#transactionsService.getAll().subscribe({
      next: transactions => {
        this.transactions.set(transactions);
      },
    });
  }
}
