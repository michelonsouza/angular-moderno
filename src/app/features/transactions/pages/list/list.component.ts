import { MatButtonModule } from '@angular/material/button';
import { Component, computed, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ConfirmationDialogService } from '@shared/dialog/confirmation/services/confirmation-dialog.service';
import { FeedbackService } from '@shared/feedback/services/feedback.service';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { TransactionsService } from '@shared/transaction/services/transactions.service';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { TransactionsContainerComponent } from './components/transactions-container/transactions-container.component';
import { SearchComponent } from './components/search/search.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

function typingDelay<DataType>(signal: Signal<DataType>, delay = 500): Signal<DataType> {
  const observable = toObservable(signal).pipe(debounceTime(delay));

  return toSignal(observable, { initialValue: signal() });
}

@Component({
  selector: 'app-list',
  imports: [
    TransactionItem,
    NoTransactions,
    MatButtonModule,
    RouterLink,
    TransactionsContainerComponent,
    TransactionsContainerComponent,
    SearchComponent,
    MatProgressBarModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  readonly #feedbackService = inject(FeedbackService);
  readonly #transactionsService = inject(TransactionsService);
  readonly #router = inject(Router);
  readonly #confirmationDialogService = inject(ConfirmationDialogService);
  readonly #activatedRoute = inject(ActivatedRoute);

  protected readonly searchTerm = signal<string>('');

  readonly #resourceRef = this.#transactionsService.getAllWithHttpResource(
    typingDelay(this.searchTerm),
  );

  protected readonly isLoading = computed(() => this.#resourceRef.isLoading());

  protected readonly transactions = computed(() => this.#resourceRef.value());

  edit(transaction: Transaction) {
    this.#router.navigate(['edit', transaction.id], {
      relativeTo: this.#activatedRoute,
    });
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
    this.#resourceRef.update(prev =>
      prev.filter(prevTransaction => prevTransaction.id !== transaction.id),
    );
  }
}
