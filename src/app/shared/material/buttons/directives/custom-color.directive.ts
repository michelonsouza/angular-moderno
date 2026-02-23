import { Directive, input, effect, inject, ElementRef, Renderer2 } from '@angular/core';

type ColorType = 'error';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[matButtonColor]',
})
export class CustomColorDirective {
  readonly #elementRef = inject(ElementRef);
  readonly #renderer2 = inject(Renderer2);

  public readonly matButtonColor = input<ColorType | undefined>(undefined);

  constructor() {
    effect(() => {
      if (this.matButtonColor()) {
        this.#renderer2.addClass(this.#elementRef.nativeElement, `btn-${this.matButtonColor()}`);
      }
    });
  }
}
