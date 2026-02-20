import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { TransactionsService } from '@/app/shared/transaction/services/transactions.service';
import { Transaction } from '@/app/shared/transaction/interfaces/transaction';

export const getTransactionsResolver: ResolveFn<Transaction[]> = (_route, _state) => {
  const transactionsService = inject(TransactionsService);

  return transactionsService.getAll();
};
