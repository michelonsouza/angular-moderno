import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgxMaskDirective } from 'ngx-mask';
import { TransactionsService } from '@/app/shared/transaction/services/transactions.service';
import {
  TransactionPayload,
  TransactionType,
} from '@/app/shared/transaction/interfaces/transaction';
import { Router } from '@angular/router';
import { FeedbackService } from '@/app/shared/feedback/services/feedback.service';

@Component({
  selector: 'app-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAnchor,
    MatButtonModule,
    MatButtonToggleModule,
    NgxMaskDirective,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  readonly #transactionsService = inject(TransactionsService);
  readonly #router = inject(Router);
  readonly #feedbackService = inject(FeedbackService);

  protected readonly submitLoading = signal(false);
  protected form = new FormGroup({
    type: new FormControl<TransactionType>('outcome', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    value: new FormControl(0, {
      validators: [Validators.required, Validators.min(0.01)],
      nonNullable: true,
    }),
  });

  protected submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitLoading.set(true);

    const payload: TransactionPayload = {
      title: this.form.value.title as string,
      value: this.form.value.value as number,
      type: this.form.value.type as TransactionType,
    };

    this.#transactionsService.create(payload).subscribe({
      next: () => {
        this.#feedbackService.success('Transação criada com sucesso', 'Fechar');

        this.#router.navigate(['/']);
      },
      complete: () => {
        this.submitLoading.set(false);
      },
    });
  }
}
