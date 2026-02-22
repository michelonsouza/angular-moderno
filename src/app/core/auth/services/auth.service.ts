import { Injectable } from '@angular/core';
import { from, Observable, of, switchMap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { createToken, verifyAndDecodeToken } from '../utils/jwt';

import { AuthTokenResponse } from '../interfaces/auth-token-response';
import { UserCredentials } from '../interfaces/user-credentials';
import { User } from '../interfaces/user';

const mockedUser = {
  email: 'email@email.com',
  password: '123456',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public login(payload: UserCredentials): Observable<AuthTokenResponse> {
    if (payload.email !== mockedUser.email || payload.password !== mockedUser.password) {
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 401,
            statusText: 'Unauthorized',
            error: 'Invalid credentials',
          }),
      );
    }

    return from(createToken({ email: payload.email })).pipe(
      switchMap(token => of({ token } as AuthTokenResponse)),
    );
  }

  public logout() {
    return of({});
  }

  public getCurrentUser(token: string): Observable<User | null> {
    return from(verifyAndDecodeToken(token)).pipe(
      switchMap(payload => {
        if (!payload?.email) {
          return of(null);
        }

        const user: User = {
          name: 'John Doe',
          email: payload?.email,
        };

        return of(user);
      }),
    );
  }

  public refreshToken(token: string) {
    return from(verifyAndDecodeToken(token)).pipe(
      switchMap(payload => {
        if (!payload?.email) {
          return of(null);
        }

        return from(createToken({ email: payload?.email })).pipe(
          switchMap(newToken => of({ token: newToken } as AuthTokenResponse)),
        );
      }),
    );
  }
}
