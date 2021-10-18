import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { IncomeOutcome } from 'src/app/core/models/incomes-outcome.model';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: [
  ]
})
export class StatisticsComponent implements OnInit, OnDestroy {
  public doughnutChartLabels: Label[] = ['incomes', 'outcomes'];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType: ChartType = 'doughnut';
  incomesOutcomesSubs:Subscription;
  incomes:number = 0;
  outcomes:number = 0;
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
   this.incomesOutcomesSubs = this.store.select('incomesOutcomes').subscribe((incomesOutcomes)=>{
        this.incomes = 0;
        this.outcomes = 0;
        incomesOutcomes.items.forEach((incomeOutcome:IncomeOutcome)=>{
          incomeOutcome.type === 'income' ? this.incomes += incomeOutcome.amount : this.outcomes += incomeOutcome.amount;
          this.doughnutChartData = [[this.incomes,this.outcomes]];
        });
    });
  }

  ngOnDestroy(){
    this.incomesOutcomesSubs.unsubscribe();
  }

}
