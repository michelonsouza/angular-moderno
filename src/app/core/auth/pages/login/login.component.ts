import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel, MatError, MatSuffix } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { FeedbackService } from '@/app/shared/feedback/services/feedback.service';
import { UserCredentials } from '@core/auth/interfaces/user-credentials';
import { AuthTokenStorageService } from '../../services/auth-token-storage.service';
import { LoginFacadeService } from '../../facades/login-facade.service';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly #authTokenStorageService = inject(AuthTokenStorageService);
  readonly #feebackService = inject(FeedbackService);
  readonly #router = inject(Router);
  readonly #loginFacadeService = inject(LoginFacadeService);

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

  public submit() {
    if (this.form.invalid) {
      return;
    }

    const payload: UserCredentials = this.form.getRawValue();

    this.#loginFacadeService.login(payload).subscribe({
      next: () => {
        this.#router.navigate(['/']);
      },
      error: (response: HttpErrorResponse) => {
        this.#authTokenStorageService.remove();

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
