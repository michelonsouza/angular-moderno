import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgxMaskDirective } from 'ngx-mask';
import { TransactionsService } from '@shared/transaction/services/transactions.service';
import {
  Transaction,
  TransactionPayload,
  TransactionType,
} from '@shared/transaction/interfaces/transaction';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from '@shared/feedback/services/feedback.service';
import { tap } from 'rxjs';
import { CustomFormFieldDirective } from '@/app/shared/material/form-field/directives/custom-form-field.directive';

@Component({
  selector: 'app-create-or-edit',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAnchor,
    MatButtonModule,
    MatButtonToggleModule,
    NgxMaskDirective,
    CustomFormFieldDirective,
  ],
  templateUrl: './create-or-edit.component.html',
  styleUrl: './create-or-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrEditComponent {
  readonly #transactionsService = inject(TransactionsService);
  readonly #router = inject(Router);
  readonly #feedbackService = inject(FeedbackService);
  readonly #activatedRoute = inject(ActivatedRoute);

  protected readonly transaction = input<Transaction | null>();

  protected readonly submitLoading = signal(false);

  readonly #isEdit = computed(() => !!this.transaction());

  protected form = computed(
    () =>
      new FormGroup({
        type: new FormControl<TransactionType>(this.transaction()?.type ?? 'outcome', {
          validators: [Validators.required],
          nonNullable: true,
        }),
        title: new FormControl(this.transaction()?.title ?? '', {
          validators: [Validators.required, Validators.minLength(3)],
          nonNullable: true,
        }),
        value: new FormControl(this.transaction()?.value ?? 0, {
          validators: [Validators.required, Validators.min(0.01)],
          nonNullable: true,
        }),
      }),
  );

  protected submit() {
    if (this.form().invalid) {
      return;
    }

    this.submitLoading.set(true);

    const payload = {
      title: this.form().value.title as string,
      value: this.form().value.value as number,
      type: this.form().value.type as TransactionType,
      createdAt: this.transaction()?.createdAt,
    } as TransactionPayload;

    this.#createOrEdit(payload).subscribe({
      next: () => {
        this.#router.navigate(['../../'], {
          relativeTo: this.#activatedRoute,
        });
      },
      complete: () => {
        this.submitLoading.set(false);
      },
    });
  }

  #createOrEdit(payload: TransactionPayload) {
    if (this.#isEdit()) {
      return this.#transactionsService
        .updateById(this.transaction()!.id, payload)
        .pipe(tap(() => this.#feedbackService.success('Transação alterada com sucesso', 'Fechar')));
    }

    return this.#transactionsService
      .create(payload)
      .pipe(tap(() => this.#feedbackService.success('Transação criada com sucesso', 'Fechar')));
  }
}
