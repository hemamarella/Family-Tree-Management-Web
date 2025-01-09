import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import {Chart} from 'chart.js/auto';

@Component({
  selector: 'app-members-chart',
  templateUrl: './members-chart.component.html',
  styleUrls: ['./members-chart.component.css']
})
export class MembersChartComponent implements OnChanges {
  @ViewChild('chart') chartCanvas!: ElementRef;
  @Input() title!: string;
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() showToggle = false;
  @Input() timeFrame: 'monthly' | 'yearly' = 'monthly';
  @Output() timeFrameChange: EventEmitter<'monthly' | 'yearly'> = new EventEmitter<'monthly' | 'yearly'>();


  private chart?: Chart;

  onTimeFrameChanged(newTimeFrame: 'monthly' | 'yearly'): void {
    this.timeFrameChange.emit(newTimeFrame);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['labels'] || changes['data']) && this.chartCanvas) {
      this.initChart();
    }
  }

  setTimeFrame(timeFrame: 'monthly' | 'yearly') {
    this.timeFrame = timeFrame;
  }

  private initChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: this.title,
          data: this.data,
          backgroundColor: '#2196F3'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: this.title
          }
        }
      }
    });
  }
}