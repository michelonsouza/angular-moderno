import type { Transaction, TransactionType } from '../interfaces/transaction';

export function sumTransactions(transactions: Transaction[], type: TransactionType) {
  return transactions
    .filter(item => item.type === type)
    .reduce((total, item) => total + item.value, 0);
}
