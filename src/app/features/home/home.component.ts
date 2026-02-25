import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Transaction } from '@shared/transaction/interfaces/transaction';
import { sumTransactions } from '@shared/transaction/functions/sum-transactions';

import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { PieChartConfig } from './components/pie-chart/pi-chart-config.interface';
import { Balance } from './components/balance/balance';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [
    Balance,
    PieChartComponent,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIcon,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public readonly transactions = input.required<Transaction[]>();
  protected canLoadComponent = signal<boolean>(false);

  protected readonly totalIncomes = computed(() => {
    return sumTransactions(this.transactions(), 'income');
  });

  protected readonly totalOutcomes = computed(() => {
    return sumTransactions(this.transactions(), 'outcome');
  });

  protected readonly chartConfig = computed<PieChartConfig>(() => ({
    labels: ['Ganhos', 'Gastos'],
    dataLabel: 'Valor total',
    data: [this.totalIncomes(), this.totalOutcomes()],
  }));
}
