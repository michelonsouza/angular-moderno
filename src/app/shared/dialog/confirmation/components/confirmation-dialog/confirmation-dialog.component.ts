import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../../interfaces/dialog-data';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: 'confirmation-dialog.component.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  readonly dialogData = signal(inject<DialogData>(MAT_DIALOG_DATA));

  readonly #defaultDialogData: Partial<DialogData> = {
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
  };

  readonly resolvedDialogData = computed(() => ({
    ...this.#defaultDialogData,
    ...this.dialogData(),
  }));
}
