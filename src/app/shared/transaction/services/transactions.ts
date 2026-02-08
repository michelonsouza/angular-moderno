import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transaction } from '../interfaces/transaction';

import { environment } from '@/environments/environment';

const BASE_URL = `${environment.NG_APP_API_URL}/transactions`;

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  readonly #httpClient = inject(HttpClient);

  public getAll() {
    return this.#httpClient.get<Transaction[]>(BASE_URL);
  }
}
