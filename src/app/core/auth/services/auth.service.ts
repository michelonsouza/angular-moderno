import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { createToken } from '../utils/jwt';

import { AuthTokenResponse } from '../interfaces/auth-token-response';
import { UserCredentials } from '../interfaces/user-credentials';

const mockedUser = {
  email: 'email@email.com',
  password: '123456',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public async login(payload: UserCredentials): Promise<Observable<AuthTokenResponse>> {
    if (payload.email === mockedUser.email && payload.password === mockedUser.password) {
      const token = await createToken({ email: payload.email });

      return of({ token });
    }

    return throwError(
      () =>
        new HttpErrorResponse({
          status: 401,
          statusText: 'Unauthorized',
          error: 'Invalid credentials',
        }),
    );
  }
}
