import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './statistics/statistics.component';
import { IncomeOutcomeComponent } from './income-outcome.component';
import { DetailComponent } from './detail/detail.component';

const routes:Routes = [
  { path: '', component: StatisticsComponent },
  { path: 'income-outcome', component: IncomeOutcomeComponent },
  { path: 'detail', component: DetailComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class IncomeOutcomeRoutingModule { }
