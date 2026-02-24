import { HttpClient, HttpParams, httpResource, HttpResourceRequest } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { Transaction, TransactionPayload } from '../interfaces/transaction';

import { uuid } from '@core/utils/uuid';
import { environment } from '@/environments/environment.development';

const BASE_URL = `${environment.NG_APP_API_URL}/transactions`;

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  readonly #httpClient = inject(HttpClient);

  public getAll(searchTerm?: string) {
    let httpParams = new HttpParams();

    if (searchTerm) {
      httpParams = httpParams.append('q', searchTerm);
    }
    return this.#httpClient.get<Transaction[]>(BASE_URL, {
      params: httpParams,
    });
  }

  public getAllWithHttpResource(searchTerm: Signal<string>) {
    return httpResource<Transaction[]>(
      () => {
        let httpParams = new HttpParams();

        if (searchTerm()) {
          httpParams = httpParams.set('q', searchTerm());
        }

        return {
          url: BASE_URL,
          params: httpParams,
        } as HttpResourceRequest;
      },
      {
        defaultValue: [],
      },
    );
  }

  public getById(id: string) {
    return this.#httpClient.get<Transaction>(`${BASE_URL}/${id}`);
  }

  public create(data: TransactionPayload) {
    const now = new Date();
    const parsedData = {
      id: uuid(),
      ...data,
      createdAt: now,
      updatedAt: now,
    } as Transaction;

    return this.#httpClient.post<Transaction>(BASE_URL, parsedData);
  }

  public updateById(id: string, data: Partial<TransactionPayload>) {
    return this.#httpClient.put<Transaction>(`${BASE_URL}/${id}`, {
      ...data,
      updatedAt: new Date(),
    });
  }

  public deleteById(id: string) {
    return this.#httpClient.delete<Transaction>(`${BASE_URL}/${id}`);
  }
}
