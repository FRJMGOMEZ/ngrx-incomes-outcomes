import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeOutcomeComponent } from './income-outcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';
import { ChartsModule } from 'ng2-charts';
import { IncomeOutcomeRoutingModule } from './income-outcome-routing.module';
import { StoreModule } from '@ngrx/store';
import { incomesOutcomesReducer } from './store/incomes-outcomes.reducer';


@NgModule({
  declarations: [
    IncomeOutcomeComponent,
    StatisticsComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ChartsModule,
    IncomeOutcomeRoutingModule,
    StoreModule.forFeature('incomesOutcomes',incomesOutcomesReducer)
  ]
})
export class IncomeOutcomeModule { }
