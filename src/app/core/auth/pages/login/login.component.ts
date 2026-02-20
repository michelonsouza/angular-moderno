import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel, MatError, MatSuffix } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '@core/auth/services/auth.service';
import { FeedbackService } from '@/app/shared/feedback/services/feedback.service';
import { UserCredentials } from '@core/auth/interfaces/user-credentials';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormField,
    MatLabel,
    MatError,
    MatSuffix,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCard,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly #feebackService = inject(FeedbackService);
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);
  protected readonly hidePassword = signal<boolean>(true);

  protected readonly ariaLabel = computed(
    () => `${this.hidePassword() ? 'Mostrar' : 'Ocultar'} senha`,
  );

  protected form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  public async submit() {
    if (this.form.invalid) {
      return;
    }

    const payload: UserCredentials = this.form.getRawValue();

    const response = await this.#authService.login(payload);

    response.subscribe({
      next: ({ token: _ }) => {
        this.#router.navigate(['/']);
      },
      error: (response: HttpErrorResponse) => {
        if (response.status === 401) {
          this.form.setErrors({ wrongCredentials: true });

          return;
        }

        this.#feebackService.error('Erro ao realizar login.', 'Fechar');
      },
    });
  }

  public toggleHidePassword(event: MouseEvent) {
    event.stopPropagation();
    this.hidePassword.update(value => !value);
  }
}
