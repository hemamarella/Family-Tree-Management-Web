// import { Component, OnInit } from '@angular/core';
// import { DashboardService } from '../dashboard.service';
// import { DashboardStats } from '../modal/dashboard';


// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {
//   stats?: DashboardStats;
//   selectedTimeFrame: 'monthly' | 'yearly' = 'monthly';

//   constructor(private dashboardService: DashboardService) {}

//   ngOnInit() {
//     this.dashboardService.getFamilyStats().subscribe(data => {
//       this.stats = data;
//     });
//   }

//   get familyLabels(): string[] {
//     return this.stats?.familyMembers.map(f => f.familyName) || [];
//   }

//   get familyData(): number[] {
//     return this.stats?.familyMembers.map(f => f.members) || [];
//   }

//   get timeFrameLabels(): string[] {
//     return this.selectedTimeFrame === 'monthly'
//       ? (this.stats?.monthlyStats.map(m => m.month) || [])
//       : (this.stats?.yearlyStats.map(y => y.year) || []);
//   }

//   get timeFrameData(): number[] {
//     return this.selectedTimeFrame === 'monthly'
//       ? (this.stats?.monthlyStats.map(m => m.members) || [])
//       : (this.stats?.yearlyStats.map(y => y.members) || []);
//   }

//   onTimeFrameChange(timeFrame: 'monthly' | 'yearly') {
//     this.selectedTimeFrame = timeFrame;
//   }
// }





import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { DashboardStats } from '../modal/dashboard';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('familyChart') familyChart!: ElementRef;
  @ViewChild('monthlyChart') monthlyChart!: ElementRef;
  
  stats: any;
  private charts: Chart[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getFamilyStats().subscribe(data => {
      this.stats = data;
      // Charts will be initialized in ngAfterViewInit
    });
  }

  ngAfterViewInit() {
    if (this.stats) {
      this.initializeCharts();
    }
  }

  private initializeCharts() {
    // Destroy existing charts if any
    this.charts.forEach(chart => chart.destroy());
    this.charts = [];

    // Family members chart
    const familyCtx = this.familyChart.nativeElement.getContext('2d');
    this.charts.push(new Chart(familyCtx, {
      type: 'bar',
      data: {
        labels: this.stats.familyMembers.map((f: any) => f.familyName),
        datasets: [{
          label: 'Members per Family',
          data: this.stats.familyMembers.map((f: any) => f.members),
          backgroundColor: '#718072'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Members per Family'
          }
        }
      }
    }));

    // Monthly members chart
    const monthlyCtx = this.monthlyChart.nativeElement.getContext('2d');
    this.charts.push(new Chart(monthlyCtx, {
      type: 'bar',
      data: {
        labels: this.stats.monthlyStats.map((m: any) => m.month),
        datasets: [{
          label: 'Members Added Monthly',
          data: this.stats.monthlyStats.map((m: any) => m.members),
          backgroundColor: '#718072'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Member Addition'
          }
        }
      }
    }));
  }
}