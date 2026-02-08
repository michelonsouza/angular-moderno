export type TransactionType = 'income' | 'outcome' | 'balance';

export interface Transaction {
  title: string;
  type: TransactionType;
  value: number;
}
