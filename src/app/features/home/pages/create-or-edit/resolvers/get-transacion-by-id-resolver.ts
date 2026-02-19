import { Transaction } from '@/app/shared/transaction/interfaces/transaction';
import { TransactionsService } from '@/app/shared/transaction/services/transactions.service';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

export const getTransacionByIdResolver: ResolveFn<Transaction> = (route, _state) => {
  const transactionService = inject(TransactionsService);

  const id = route.paramMap.get('id') as string;

  return transactionService.getById(id);
};
