export type TransactionType = 'income' | 'outcome' | 'balance';

export interface Transaction {
  id: string;
  title: string;
  value: number;
  type: TransactionType;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type TransactionPayload = Omit<Transaction, 'id'>;
