import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transaction, TransactionPayload } from '../interfaces/transaction';

import { environment } from '@/environments/environment';
import { uuid } from '@/app/core/utils/uuid';

const BASE_URL = `${environment.NG_APP_API_URL}/transactions`;

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  readonly #httpClient = inject(HttpClient);

  public getAll() {
    return this.#httpClient.get<Transaction[]>(BASE_URL);
  }

  public create(data: TransactionPayload) {
    const parsedData: Transaction = {
      id: uuid(),
      ...data,
    };

    return this.#httpClient.post<Transaction>(BASE_URL, parsedData);
  }

  public updateById(id: string, data: Partial<TransactionPayload>) {
    return this.#httpClient.patch<Transaction>(`${BASE_URL}/${id}`, data);
  }

  public deleteById(id: string) {
    return this.#httpClient.delete<Transaction>(`${BASE_URL}/${id}`);
  }
}
