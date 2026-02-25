import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { PieChartConfig } from './pi-chart-config.interface';

@Component({
  selector: 'app-pie-chart',
  imports: [],
  template: `
    <canvas #canvas></canvas>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent {
  protected readonly canvasEl = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  public readonly config = input.required<PieChartConfig>();
  #chartInstance: Chart | null = null;

  readonly #destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      this.#destroyChartInstance();

      this.#chartInstance = this.#createChartInstance();
    });

    this.#destroyRef.onDestroy(() => this.#destroyChartInstance());
  }

  #createChartInstance() {
    return new Chart(this.canvasEl().nativeElement, {
      type: 'pie',
      data: {
        labels: this.config().labels,
        datasets: [
          {
            label: this.config().dataLabel,
            data: this.config().data,
          },
        ],
      },
    });
  }

  #destroyChartInstance() {
    if (this.#chartInstance && this.#chartInstance.destroy) {
      this.#chartInstance.destroy();
      this.#chartInstance = null;
    }
  }
}
