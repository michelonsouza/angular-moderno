import { Component, signal } from '@angular/core';
import { Balance, type TransactionType } from './components/balance/balance';

@Component({
  selector: 'app-home',
  imports: [Balance],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  public readonly transactions = signal<TransactionType[]>([
    { value: 100, type: 'income' },
    { value: 50, type: 'income' },
    { value: 50, type: 'outcome' },
    { value: 100, type: 'outcome' },
  ]);
}
