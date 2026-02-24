import { TransactionType } from '@/app/shared/transaction/interfaces/transaction';
import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[isIncome]',
})
export class IsIncomeDirective {
  readonly #temmplateRef = inject(TemplateRef);
  readonly #viewContainerRef = inject(ViewContainerRef);

  public isIncome = input.required<TransactionType>();
  public isIncomeElse = input<TemplateRef<unknown> | undefined>(undefined);

  constructor() {
    effect(() => {
      if (this.isIncome() === 'income') {
        this.#viewContainerRef.createEmbeddedView(this.#temmplateRef);
      } else if (this.isIncomeElse()) {
        this.#viewContainerRef.createEmbeddedView(
          this.isIncomeElse() as unknown as TemplateRef<unknown>,
        );
      } else {
        this.#viewContainerRef.clear();
      }
    });
  }
}
