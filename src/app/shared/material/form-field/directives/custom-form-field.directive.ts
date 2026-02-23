import { Directive } from '@angular/core';
import { FullWidthDirective } from './full-width.directive';
import { MarginBottomDirective } from './margin-bottom.directive';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'mat-form-field',
  hostDirectives: [
    {
      directive: FullWidthDirective,
      inputs: ['appFullWidth: fw'],
    },
    {
      directive: MarginBottomDirective,
      inputs: ['appMarginBottom: mb'],
    },
  ],
})
export class CustomFormFieldDirective {}
