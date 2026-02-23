import {
  booleanAttribute,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appFullWidth]',
})
export class FullWidthDirective {
  readonly #elementRef = inject(ElementRef);
  readonly #renderer2 = inject(Renderer2);

  readonly appFullWidth = input(true, {
    transform: booleanAttribute,
  });

  constructor() {
    effect(() => {
      if (this.appFullWidth()) {
        this.#renderer2.setStyle(this.#elementRef.nativeElement, 'width', '100%');
        this.#renderer2.setAttribute(
          this.#elementRef.nativeElement,
          'data-element',
          this.#elementRef.nativeElement?.tagName?.toLowerCase(),
        );
      }
    });
  }
}
