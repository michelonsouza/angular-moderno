import { computed, Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMarginBottom]',
})
export class MarginBottomDirective {
  readonly #elementRef = inject(ElementRef);
  readonly #renderer2 = inject(Renderer2);

  readonly appMarginBottom = input('', {
    transform: (value: string | number | undefined) => {
      if (!value) {
        return '24px';
      }

      if (typeof value === 'number') {
        return `${value}px`;
      }

      return value;
    },
  });

  private readonly _resolvedMarginBottom = computed(() => {
    const value = this.appMarginBottom();

    if (!value) {
      return '24px';
    }

    if (typeof value === 'number') {
      return `${value}px`;
    }

    return value;
  });

  constructor() {
    effect(() => {
      if (this.appMarginBottom()) {
        this.#renderer2.setStyle(
          this.#elementRef.nativeElement,
          'margin-bottom',
          this.appMarginBottom(),
        );
        this.#renderer2.setAttribute(
          this.#elementRef.nativeElement,
          'data-element',
          this.#elementRef.nativeElement?.tagName?.toLowerCase(),
        );
      }
    });
  }
}
